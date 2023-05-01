import CabData from "./cabdata";
import Evacuation from "./evacuation";
import PolygonScheme from "./scheme";
import Timetable from "./timetable";
import SyncStorage from 'sync-storage';

export default class Load{

    static async loadData() {
        try {
            //cabData
            const CabDataFour = await CabData.getCabDataByFloor(4);
            const CabDataThree = await CabData.getCabDataByFloor(3);
            const CabDataTwo = await CabData.getCabDataByFloor(2);
            const CabDataOne = await CabData.getCabDataByFloor(1);
            const CabDataMOne = await CabData.getCabDataByFloor(-1);
            SyncStorage.set('CabDataFour', JSON.stringify(CabDataFour));
            SyncStorage.set('CabDataThree', JSON.stringify(CabDataThree));
            SyncStorage.set('CabDataTwo', JSON.stringify(CabDataTwo));
            SyncStorage.set('CabDataOne', JSON.stringify(CabDataOne));
            SyncStorage.set('CabDataMOne', JSON.stringify(CabDataMOne));

            //Evacuation
            const EvacuationFour = await Evacuation.getEvacuationByFloor(4);
            const EvacuationThree = await Evacuation.getEvacuationByFloor(3);
            const EvacuationTwo = await Evacuation.getEvacuationByFloor(2);
            const EvacuationOne = await Evacuation.getEvacuationByFloor(1);
            const EvacuationMOne = await Evacuation.getEvacuationByFloor(-1);
            SyncStorage.set('EvacuationFour', JSON.stringify(EvacuationFour));
            SyncStorage.set('EvacuationThree', JSON.stringify(EvacuationThree));
            SyncStorage.set('EvacuationTwo', JSON.stringify(EvacuationTwo));
            SyncStorage.set('EvacuationOne', JSON.stringify(EvacuationOne));
            SyncStorage.set('EvacuationMOne', JSON.stringify(EvacuationMOne));

            //Scheme
            const SchemeFour = await PolygonScheme.getScheme(4);
            const SchemeThree = await PolygonScheme.getScheme(3);
            const SchemeTwo = await PolygonScheme.getScheme(2);
            const SchemeOne = await PolygonScheme.getScheme(1);
            const SchemeMOne = await PolygonScheme.getScheme(-1);
            SyncStorage.set('SchemeFour', JSON.stringify(SchemeFour));
            SyncStorage.set('SchemeThree', JSON.stringify(SchemeThree));
            SyncStorage.set('SchemeTwo', JSON.stringify(SchemeTwo));
            SyncStorage.set('SchemeOne', JSON.stringify(SchemeOne));
            SyncStorage.set('SchemeMOne', JSON.stringify(SchemeMOne));

            //Timetable
            const TimetableMonday =  await Timetable.getTimetableByDayId(1);
            const TimetableTuesday =  await Timetable.getTimetableByDayId(2);
            const TimetableWednesday = await Timetable.getTimetableByDayId(3);
            const TimetableThursday = await Timetable.getTimetableByDayId(4);
            const TimetableFriday = await Timetable.getTimetableByDayId(5);
            const TimetableSaturday = await Timetable.getTimetableByDayId(6);
            const TimetableSunday = await Timetable.getTimetableByDayId(0);
            SyncStorage.set('TimetableMonday', JSON.stringify(TimetableMonday));
            SyncStorage.set('TimetableTuesday', JSON.stringify(TimetableTuesday));
            SyncStorage.set('TimetableWednesday', JSON.stringify(TimetableWednesday));
            SyncStorage.set('TimetableThursday', JSON.stringify(TimetableThursday));
            SyncStorage.set('TimetableFriday', JSON.stringify(TimetableFriday));
            SyncStorage.set('TimetableSaturday', JSON.stringify(TimetableSaturday));
            SyncStorage.set('TimetableSunday', JSON.stringify(TimetableSunday));

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
            SyncStorage.set('TimetableMonday', JSON.stringify(TimetableMonday));
            SyncStorage.set('TimetableTuesday', JSON.stringify(TimetableTuesday));
            SyncStorage.set('TimetableWednesday', JSON.stringify(TimetableWednesday));
            SyncStorage.set('TimetableThursday', JSON.stringify(TimetableThursday));
            SyncStorage.set('TimetableFriday', JSON.stringify(TimetableFriday));
            SyncStorage.set('TimetableSaturday', JSON.stringify(TimetableSaturday));
            SyncStorage.set('TimetableSunday', JSON.stringify(TimetableSunday));
        }
        catch (e) {
            throw new Error(e.message)
        }

    }
}