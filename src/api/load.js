import CabData from "./cabdata";
import Evacuation from "./evacuation";
import PolygonScheme from "./scheme";
import Timetable from "./timetable";


export default class Load{

    static async loadData() {
        try {
            //cabData
            const CabDataFour = await CabData.getCabDataByFloor(4);
            const CabDataThree = await CabData.getCabDataByFloor(3);
            const CabDataTwo = await CabData.getCabDataByFloor(2);
            const CabDataOne = await CabData.getCabDataByFloor(1);
            const CabDataMOne = await CabData.getCabDataByFloor(-1);
            localStorage.setItem('CabDataFour', JSON.stringify(CabDataFour));
            localStorage.setItem('CabDataThree', JSON.stringify(CabDataThree));
            localStorage.setItem('CabDataTwo', JSON.stringify(CabDataTwo));
            localStorage.setItem('CabDataOne', JSON.stringify(CabDataOne));
            localStorage.setItem('CabDataMOne', JSON.stringify(CabDataMOne));

            //Evacuation
            const EvacuationFour = await Evacuation.getEvacuationByFloor(4);
            const EvacuationThree = await Evacuation.getEvacuationByFloor(3);
            const EvacuationTwo = await Evacuation.getEvacuationByFloor(2);
            const EvacuationOne = await Evacuation.getEvacuationByFloor(1);
            const EvacuationMOne = await Evacuation.getEvacuationByFloor(-1);
            localStorage.setItem('EvacuationFour', JSON.stringify(EvacuationFour));
            localStorage.setItem('EvacuationThree', JSON.stringify(EvacuationThree));
            localStorage.setItem('EvacuationTwo', JSON.stringify(EvacuationTwo));
            localStorage.setItem('EvacuationOne', JSON.stringify(EvacuationOne));
            localStorage.setItem('EvacuationMOne', JSON.stringify(EvacuationMOne));

            //Scheme
            const SchemeFour = await PolygonScheme.getScheme(4);
            const SchemeThree = await PolygonScheme.getScheme(3);
            const SchemeTwo = await PolygonScheme.getScheme(2);
            const SchemeOne = await PolygonScheme.getScheme(1);
            const SchemeMOne = await PolygonScheme.getScheme(-1);
            localStorage.setItem('SchemeFour', JSON.stringify(SchemeFour));
            localStorage.setItem('SchemeThree', JSON.stringify(SchemeThree));
            localStorage.setItem('SchemeTwo', JSON.stringify(SchemeTwo));
            localStorage.setItem('SchemeOne', JSON.stringify(SchemeOne));
            localStorage.setItem('SchemeMOne', JSON.stringify(SchemeMOne));

            //Timetable
            await Load.loadTimetable()

            return true;
        } catch (e) {
            throw new Error(e.message)
        }
    }
    static async loadTimetable() {
        try {
            const TimetableMonday =  await Timetable.getTimetableByDayId(1);
            const TimetableTuesday =  await Timetable.getTimetableByDayId(2);
            const TimetableWednesday = await Timetable.getTimetableByDayId(3);
            const TimetableThursday = await Timetable.getTimetableByDayId(4);
            const TimetableFriday = await Timetable.getTimetableByDayId(5);
            const TimetableSaturday = await Timetable.getTimetableByDayId(6);
            const TimetableSunday = await Timetable.getTimetableByDayId(0);
            localStorage.setItem('TimetableMonday', JSON.stringify(TimetableMonday));
            localStorage.setItem('TimetableTuesday', JSON.stringify(TimetableTuesday));
            localStorage.setItem('TimetableWednesday', JSON.stringify(TimetableWednesday));
            localStorage.setItem('TimetableThursday', JSON.stringify(TimetableThursday));
            localStorage.setItem('TimetableFriday', JSON.stringify(TimetableFriday));
            localStorage.setItem('TimetableSaturday', JSON.stringify(TimetableSaturday));
            localStorage.setItem('TimetableSunday', JSON.stringify(TimetableSunday));
        }
        catch (e) {
            throw new Error(e.message)
        }

    }
}