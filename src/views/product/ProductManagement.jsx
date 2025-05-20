/**
 * ProductManagement Component
 * 
 * This component is used to manage products in the system.
 * It includes functionalities to create, update, and delete products.
 * It also displays a table with the list of products and their details.
 * It uses Material-UI for styling and icons.
 * It also includes functionalities to export product data to PDF and CSV formats.
 */
import ProductBanner from "./ProductBanner.jsx";
import useProductData from "../../hooks/apiData/product/productData.jsx";
import {getAllProductRequests} from "../../api/productRequest/productRequest.js";
import {useEffect, useMemo, useState} from "react";
import {MaterialReactTable, useMaterialReactTable} from "material-react-table";
import {Box, Typography} from "@mui/material";
import LoadingPointsSpinner from "../../components/spinner/loadingSpinner/LoadingPointsSpinner.jsx";
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import EditButton from "../../components/button/EditButton.jsx";
import {useNavigate} from "react-router-dom";
import {StatusTranslator} from "../../util/Translator.js";
import {getStateColor} from "../../util/SelectColorByStatus.js";
import {getStateIcon} from "../../util/SelectIconByStatus.jsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { toast } from "react-hot-toast";

/**
 * ProductManagement component that displays a banner for the Product management page.
 * 
 * @component
 * @param {string} title - The title of the banner.
 * @param {Array} visibleButtons - The buttons to display on the banner.
 * @param {function} productInfo - The function to call when displaying product information.
 * @param {function} exportToPDF - The function to call when exporting data to PDF.
 * @param {function} preparePDF - The function to call when preparing data for PDF export.
 * @param {Array} productData - The data to export to CSV.
 * @return {JSX.Element} - The ProductBanner component.
 */
const ProductManagement = () => {
    const { products, isLoading, isError, refetch } = useProductData();
    const [productData, setProductData] = useState([]);
    const [productRequests, setProductRequests] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (products?.data && Array.isArray(products.data)) {
            const translatedData = products.data.map(product => ({
                ...product,
                status: {
                    ...product.status,
                    name: StatusTranslator.translate(product.status.name)
                }
            }));

            setProductData(translatedData);
        }
        preparePDF()
    }, [products]);

    /**
     * VHandle the edit action for a product row.
     * 
     * @param {object} row - The row data of the product to edit.
     * @returns {void}
     */
    const handleEdit = (row) => {
        navigate("/app/updateProduct/" + row.original.id);
    };

    /**
     * Prepare the PDF document with product data and requests.
     * 
     * @param {object} row - The row data of the product to edit.
     * @returns {void}
     */
    const preparePDF = async () =>{
            try {
                const response = await getAllProductRequests();
                setProductRequests(response.data);
                if (response?.data.length === 0) {
                    toast.success("No hay solicitudes pendientes.", { icon: "🔔" });
                    return
                }
            } catch (error) {
                console.error(error);
                toast.error(error.message);
            } 
        }

    /**
     * Export the product data to a PDF document.
     * 
     * @param {object} row - The row data of the product to edit.
     * @returns {void}
     */
    const exportToPDF = async () => {
        const doc = new jsPDF();
    
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleDateString();
        doc.setFontSize(8);
        doc.text(`Fecha de elaboración: ${formattedDate}`, 80, 10);

        const CIMPA = "/UCR_CIMPA_BANNER_LOGO.png";
        doc.addImage(CIMPA,'PNG', 10, 15, 80, 22)
        

        const impactLogo ="/NEW_IMPACT_WHITE_LOGO.png"
        doc.addImage(impactLogo,'PNG', 140, 10, 60, 34)

        
        doc.setFont("helvetica", "bold");
        doc.setFontSize(16);
        doc.text("Informe de productos", 80, 50);

        doc.setFontSize(14);
        doc.text("Existencias actuales", 14, 60);
    
        const tableData = productData.map(product => [
            product.id,
            product.category.name,
            product.purchaseDate,
            product.status.name,
            product.category.unitOfMeasurement.name,
            product.category.categoryType.name
        ]);
    
        autoTable(doc, {
            head: [[
                "ID", "Nombre", "Fecha de Compra", "Estado", "Unidad de Medida", "Categoría"
            ]],
            body: tableData,
            startY: 65,
            margin: { top: 20, left: 10, right: 10 },
            columnStyles: {
                10: { cellWidth: 15 },
                11: { cellWidth: 15 }
            },
            headStyles: {
                fillColor: [0, 60, 116],
                textColor: 255,
                fontSize: 9,
                fontStyle: "bold",
            },
            bodyStyles: {
                textColor: 50,
            },
            alternateRowStyles: {
                fillColor: [240, 240, 240]
            },
        });
        
        const afterValueTextY = doc.lastAutoTable.finalY + 10;
            doc.setFontSize(14);
            doc.text("Salidas de productos (Préstamos)",14, afterValueTextY);
            autoTable(doc, {
                startY: afterValueTextY + 5,
                head: [["Fecha de solicitud", "Producto", "Usuario", "Razón", "Estado"]],
                body: productRequests.map(req => [
                    req.createdAt, req.product.category.name, req.user.name, req.reason, req.status.name
                ]),
                headStyles: {
                    fillColor: [0, 60, 116],
                    textColor: 255,
                    fontSize: 9,
                    fontStyle: 'bold',
                },
                bodyStyles: {
                    textColor: 50,
                },
                alternateRowStyles: {
                    fillColor: [240, 240, 240]
                },
            });
    
        doc.save("Informe_de_Productos.pdf");
    };
    

    const columns = useMemo(
        () => [
            { accessorKey: "id", header: "ID", size: 80 },
            { accessorKey: "category.name", header: "Nombre" },
            { accessorKey: "purchaseDate", header: "Fecha de Compra" },
            { accessorKey: 'status.name', header: 'Estado',
                Cell: ({ row }) => {
                    const status = row.original?.status;
                    return(
                        <Typography
                            sx={{
                                color: getStateColor(status.name),
                                fontFamily: 'Montserrat, sans-serif',
                            }}
                        >
                            {getStateIcon(status.name)} {status.name}
                        </Typography>
                    )
                }},
            { accessorKey: "category.unitOfMeasurement.name", header: "Unidad de Medida" },
            { accessorKey: "category.categoryType.name", header: "Categoría" },
            {
                id: "actions",
                header: "Acciones",
                size: "small",
                Cell: ({ row }) => <EditButton handleEdit={handleEdit} row={row} />,
            },
        ],
        []
    );

    const table = useMaterialReactTable({
        localization: MRT_Localization_ES,
        columns,
        data: productData,
        enableExpandAll: false,
        initialState: {
            columnVisibility: { id: false },
            density: "comfortable",
            pagination: { pageSize: 15 },
        },
        muiDetailPanelProps: () => ({
            sx: (theme) => ({
                backgroundColor:
                    theme.palette.mode === 'dark' ? 'rgba(255,210,244,0.1)' : 'rgba(0,0,0,0.1)'
            })
        }),
        muiExpandButtonProps: ({ row, table }) => ({
            onClick: () => table.setExpanded({ [row.id]: !row.getIsExpanded() }),
            sx: {
                transform: row.getIsExpanded() ? 'rotate(180deg)' : 'rotate(-90deg)',
                transition: 'transform 0.2s'
            }
        }),

        renderDetailPanel: ({ row }) => (
            <Box
                sx={{
                    display: 'grid',
                    margin: 'auto',
                    gridTemplateColumns: 'repeat(5, 1fr)',
                    width: '100%',
                    padding: '20px',
                    background: 'linear-gradient(135deg, #003c74 0%, #005DA4 100%)',
                    borderRadius: '15px',
                    boxShadow: '0px 4px 10px rgba(0, 93, 164, 0.3)',
                    color: '#f8f9fa',
                    fontFamily: '"Montserrat", sans-serif',
                    letterSpacing: '0.5px',
                    gap: '15px',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                }}
            >
                {[
                    { label: 'ID', value: row.original.id },
                    { label: 'Fecha de Compra', value: row.original.purchaseDate },
                    { label: 'Fecha de Expiración', value: row.original.expiryDate ? row.original.expiryDate : 'No tiene vencimiento' },
                    { label: 'Categoría ID', value: row.original.category.id },
                    { label: 'Categoría Nombre', value: row.original.category.name },
                    { label: 'Cantidad Mínima', value: row.original.category.minimumQuantity },
                    { label: 'Tipo de Categoría ID', value: row.original.category.categoryType.id },
                    { label: 'Tipo de Categoría Nombre', value: row.original.category.categoryType.name },
                    { label: 'Tipo de Categoría Descripción', value: row.original.category.categoryType.description },
                    { label: 'Unidad de Medida ID', value: row.original.category.unitOfMeasurement.id },
                    { label: 'Unidad de Medida Nombre', value: row.original.category.unitOfMeasurement.name },
                    { label: 'Unidad de Medida Abreviatura', value: row.original.category.unitOfMeasurement.abbreviation },
                    { label: 'Estado ID', value: row.original.status.id },
                    { label: 'Estado Nombre', value: row.original.status.name },
                    { label: 'Estado Descripción', value: row.original.status.description },
                ].map((item, index) => (
                    <Box
                        key={index}
                        sx={{
                            background: 'rgba(255, 255, 255, 0.1)',
                            padding: '8px',
                            borderRadius: '10px',
                            textAlign: 'left',
                            boxShadow: '0px 2px 5px rgba(255, 255, 255, 0.1)',
                            transition: '0.3s ease-in-out',
                            '&:hover': {
                                transform: 'scale(1.03)',
                                boxShadow: '0px 4px 12px rgba(255, 255, 255, 0.3)',
                            },
                        }}
                    >
                        <Typography sx={{ fontWeight: 'bold', color: '#f8f9fa', fontFamily: '"Montserrat", sans-serif' }}>
                            {item.label}
                        </Typography>
                        <Typography sx={{fontFamily: '"Montserrat", sans-serif' }}>{item.value || 'N/A'}</Typography>
                    </Box>
                ))}
            </Box>
        ),
        state: { isLoading, showAlertBanner: isError },
    });

    return (
        <>
            {isLoading && <LoadingPointsSpinner />}
            <ProductBanner
                title="Gestión de Productos"
                visibleButtons={["export", "csv", "pdf", "createProduct"]}
                productData={productData}
                exportToPDF={exportToPDF}
            />
            <MaterialReactTable table={table} />
        </>
    );
};

export default ProductManagement;
