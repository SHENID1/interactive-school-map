import CabData from "./cabdata";
import Evacuation from "./evacuation";
import PolygonScheme from "./scheme";
import Timetable from "./timetable";
import Data from "./getData";

export default class Load{

    // static async loadData() {
    //     try {
    //         //cabData
    //         const CabDataFour = await CabData.getCabDataByFloor(4);
    //         const CabDataThree = await CabData.getCabDataByFloor(3);
    //         const CabDataTwo = await CabData.getCabDataByFloor(2);
    //         const CabDataOne = await CabData.getCabDataByFloor(1);
    //         const CabDataMOne = await CabData.getCabDataByFloor(-1);
    //         await Data.setData('CabDataFour', JSON.stringify(CabDataFour));
    //         await Data.setData('CabDataThree', JSON.stringify(CabDataThree));
    //         await Data.setData('CabDataTwo', JSON.stringify(CabDataTwo));
    //         await Data.setData('CabDataOne', JSON.stringify(CabDataOne));
    //         await Data.setData('CabDataMOne', JSON.stringify(CabDataMOne));
    //
    //         //Evacuation
    //         const EvacuationFour = await Evacuation.getEvacuationByFloor(4);
    //         const EvacuationThree = await Evacuation.getEvacuationByFloor(3);
    //         const EvacuationTwo = await Evacuation.getEvacuationByFloor(2);
    //         const EvacuationOne = await Evacuation.getEvacuationByFloor(1);
    //         const EvacuationMOne = await Evacuation.getEvacuationByFloor(-1);
    //         await Data.setData('EvacuationFour', JSON.stringify(EvacuationFour));
    //         await Data.setData('EvacuationThree', JSON.stringify(EvacuationThree));
    //         await Data.setData('EvacuationTwo', JSON.stringify(EvacuationTwo));
    //         await Data.setData('EvacuationOne', JSON.stringify(EvacuationOne));
    //         await Data.setData('EvacuationMOne', JSON.stringify(EvacuationMOne));
    //
    //         //Scheme
    //         const SchemeFour = await PolygonScheme.getScheme(4);
    //         const SchemeThree = await PolygonScheme.getScheme(3);
    //         const SchemeTwo = await PolygonScheme.getScheme(2);
    //         const SchemeOne = await PolygonScheme.getScheme(1);
    //         const SchemeMOne = await PolygonScheme.getScheme(-1);
    //         await Data.setData('SchemeFour', JSON.stringify(SchemeFour));
    //         await Data.setData('SchemeThree', JSON.stringify(SchemeThree));
    //         await Data.setData('SchemeTwo', JSON.stringify(SchemeTwo));
    //         await Data.setData('SchemeOne', JSON.stringify(SchemeOne));
    //         await Data.setData('SchemeMOne', JSON.stringify(SchemeMOne));
    //
    //         //Timetable
    //         const TimetableMonday =  await Timetable.getTimetableByDayId(1);
    //         const TimetableTuesday =  await Timetable.getTimetableByDayId(2);
    //         const TimetableWednesday = await Timetable.getTimetableByDayId(3);
    //         const TimetableThursday = await Timetable.getTimetableByDayId(4);
    //         const TimetableFriday = await Timetable.getTimetableByDayId(5);
    //         const TimetableSaturday = await Timetable.getTimetableByDayId(6);
    //         const TimetableSunday = await Timetable.getTimetableByDayId(0);
    //         await Data.setData('TimetableMonday', JSON.stringify(TimetableMonday));
    //         await Data.setData('TimetableTuesday', JSON.stringify(TimetableTuesday));
    //         await Data.setData('TimetableWednesday', JSON.stringify(TimetableWednesday));
    //         await Data.setData('TimetableThursday', JSON.stringify(TimetableThursday));
    //         await Data.setData('TimetableFriday', JSON.stringify(TimetableFriday));
    //         await Data.setData('TimetableSaturday', JSON.stringify(TimetableSaturday));
    //         await Data.setData('TimetableSunday', JSON.stringify(TimetableSunday));
    //
    //         return true;
    //     } catch (e) {
    //         throw new Error(e.message)
    //     }
    // }
    static async loadTimetable() {
        try {
            const TimetableMonday =  await Timetable.getTimetableByDayId(1);
            const TimetableTuesday =  await Timetable.getTimetableByDayId(2);
            const TimetableWednesday = await Timetable.getTimetableByDayId(3);
            const TimetableThursday = await Timetable.getTimetableByDayId(4);
            const TimetableFriday = await Timetable.getTimetableByDayId(5);
            const TimetableSaturday = await Timetable.getTimetableByDayId(6);
            const TimetableSunday = await Timetable.getTimetableByDayId(0);
            await Data.setData('TimetableMonday', JSON.stringify(TimetableMonday));
            await Data.setData('TimetableTuesday', JSON.stringify(TimetableTuesday));
            await Data.setData('TimetableWednesday', JSON.stringify(TimetableWednesday));
            await Data.setData('TimetableThursday', JSON.stringify(TimetableThursday));
            await Data.setData('TimetableFriday', JSON.stringify(TimetableFriday));
            await Data.setData('TimetableSaturday', JSON.stringify(TimetableSaturday));
            await Data.setData('TimetableSunday', JSON.stringify(TimetableSunday));
        }
        catch (e) {
            throw new Error(e.message)
        }

    }
}