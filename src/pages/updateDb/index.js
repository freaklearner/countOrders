import Items from '../../../src/data/items';
import Stations from '../../../src/data/stations';
import useAddData from '../../../src/hooks/useAddData';



const AddItemsToDb = () => {    
    const {addItemsToDb} = useAddData();

    const dataAdd = ()=>{
        debugger
        console.log(Items);
        console.log(Stations);
        Stations.forEach((station)=>{
            Items.forEach(async (item)=>{
                item.station = station.station;
                item.stationId = station.code;
                await addItemsToDb(item)
            })
        });

        // Stations.map((station) => {
        //     Items.map(async (item) => {
        //         debugger;
        //         item.station = station.name;
        //         item.stationId = station.id;
        //         item.id = station.name+"_"+item._id;
        //         //const res = await addDataToDb(item);
        //         console.log(item);
        //     })
        // });
    }
    return {dataAdd}
}
export default AddItemsToDb;

