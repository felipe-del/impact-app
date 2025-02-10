import {getAllAssets} from "../../api/asset/asset_API.js";
import {useQuery} from "@tanstack/react-query";
import {getAllSupplier} from "../../api/supplier/Supplier.js";
import {getAllSubCategory} from "../../api/asset/subCategory_API.js";
import {getAllBrands} from "../../api/brand/brand_API.js";
import {getAllAssetStatus} from "../../api/asset/assetStatus_API.js";
import {getAllAssetModels} from "../../api/asset/assetModel_API.js";
import {getAllCurrencies} from "../../api/currency/currency_API.js";
import {getAllLocationNumber} from "../../api/locationNumber_API/locationNumber_API.js";
import LoadingPointsSpinner from "../../components/spinner/loadingSpinner/LoadingPointsSpinner.jsx";
import {useEffect, useState} from "react";
import {MaterialReactTable, useMaterialReactTable} from "material-react-table";
import {toast} from "react-hot-toast";

const AssetTable = () => {

    const [assets, setAssets] = useState([])
    const [suppliers, setSuppliers] = useState([])
    const [subCategories, setSubCategories] = useState([])
    const [brands, setBrands] = useState([])
    const [assetStatus, setAssetStatus] = useState([])
    const [assetModels, setAssetModels] = useState([])
    const [currencies, setCurrencies] = useState([])
    const [locations, setLocations] = useState([])

    const {data: assetsData, isLoading: assetsIsLoading, isError: assetsIsError} = useQuery({
        queryKey: ['assets'],
        queryFn: getAllAssets,
        retry: 1,
        refetchOnWindowFocus: false
    })
    const {data: suppliersData} = useQuery({queryKey: ['suppliers'], queryFn: getAllSupplier})
    const {data: subCategoriesData} = useQuery({queryKey: ['subCategories'], queryFn: getAllSubCategory})
    const {data: brandsData} = useQuery({queryKey: ['brands'], queryFn: getAllBrands})
    const {data: assetStatusData} = useQuery({queryKey: ['assetStatus'], queryFn: getAllAssetStatus})
    const {data: assetModelsData} = useQuery({queryKey: ['assetModels'], queryFn: getAllAssetModels})
    const {data: currencyData} = useQuery({queryKey: ['currencies'], queryFn: getAllCurrencies})
    const {data: locationsData} = useQuery({queryKey: ['locations'], queryFn: getAllLocationNumber})

    useEffect(() => {
        if(assetsData) setAssets(assetsData.data)
        if(suppliersData) setSuppliers(suppliersData.data)
        if(subCategoriesData) setSubCategories(subCategoriesData.data)
        if(brandsData) setBrands(brandsData.data)
        if(assetStatusData) setAssetStatus(assetStatusData.data)
        if(assetModelsData) setAssetModels(assetModelsData.data)
        if(currencyData) setCurrencies(currencyData.data)
        if(locationsData) setLocations(locationsData.data)
        console.log(assetsData)
        console.log(suppliersData)
        console.log(subCategoriesData)
        console.log(brandsData)
        console.log(assetStatusData)
        console.log(assetModelsData)
        console.log(currencyData)
        console.log(locationsData)
    }, [assetsData, suppliersData, subCategoriesData, brandsData, assetStatusData, assetModelsData, currencyData, locationsData])

    const columns = [
        { accessorKey: 'id', header: 'ID' },
        { accessorKey: 'purchaseDate', header: 'Purchase Date' },
        { accessorKey: 'value', header: 'Value' },
        { accessorKey: 'user.email', header: 'User' },
        { accessorKey: 'supplier.name', header: 'Supplier' },
        { accessorKey: 'subcategory.name', header: 'Sub Category' },
        { accessorKey: 'category.name', header: 'Category' },
        { accessorKey: 'brand.name', header: 'Brand' },
        { accessorKey: 'status.name', header: 'Asset Status' },
        { accessorKey: 'assetSeries', header: 'Asset Series' },
        { accessorKey: 'plateNumber', header: 'Plate Number' },
        { accessorKey: 'model.modelName', header: 'Model' },
        { accessorKey: 'currency.stateName', header: 'Currency' },
        { accessorKey: 'locationNumber.locationTypeName', header: 'Location' },
    ];


    const table = useMaterialReactTable({
        columns,
        data: assets,
        initialState: {
            columnVisibility: { id: false },
            density: 'comfortable',
            pagination: {
                pageSize: 5,
            },
        },
    })

    return (
        <>
            {assetsIsLoading && <LoadingPointsSpinner />}
            {assetsIsError && <div>Error fetching data</div>}

            <MaterialReactTable table={table} />
        </>
    )
}

export default AssetTable;