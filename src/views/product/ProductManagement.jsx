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

const ProductManagement = () => {
    const { products, isLoading, isError, refetch } = useProductData();
    const [productData, setProductData] = useState([]);
    const [productRequests, setProductRequests] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (products?.data && Array.isArray(products.data)) setProductData(products.data);
        preparePDF()
    }, [products]);

    const handleEdit = (row) => {
        navigate("/app/updateProduct/" + row.original.id);
    };

    const preparePDF = async () =>{
            try {
                const response = await getAllProductRequests();
                setProductRequests(response.data);
                if (response?.data.length === 0) {
                    toast.success("No hay solicitudes pendientes.", { icon: "🔔" });
                    return
                }
                toast.success(response.message);
            } catch (error) {
                console.error(error);
                toast.error(error.message);
            } 
        }

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
        
        //Tabla de salida de productos
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
    
        // Guardar PDF
        doc.save("Informe_de_Productos.pdf");
    };
    

    const columns = useMemo(
        () => [
            { accessorKey: "id", header: "ID", size: 80 },
            { accessorKey: "category.name", header: "Nombre" },
            { accessorKey: "purchaseDate", header: "Fecha de Compra" },
            { accessorKey: "status.name", header: "Estado" },
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
        initialState: {
            columnVisibility: { id: false },
            density: "comfortable",
            pagination: { pageSize: 5 },
        },
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
