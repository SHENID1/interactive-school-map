// import cl from "./style.module.css";
// import logo from "../../images/1566 2022.png"
// import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
// import { Breadcrumb, Layout, Menu} from 'antd';
// import React from 'react';
// import Data from "../../api/getData";
// const { Header, Content, Sider } = Layout;
// const NavOption = [{key: 1, label: "Расписание"}]
//
// const getOptions = (dataObj) => {
//     const timeTableSort = (table) => {
//         function compareSl(a, b) {
//             if (a.s[1] > b.s[1]) return -1;
//             if (a.s[1] === b.s[1] && a.s[0] < b.s[0]) return -1;
//             if (a.s[1] === b.s[1] && a.s[0] > b.s[0]) return 1;
//             if (a.s[1] < b.s[1]) return 1;
//         }
//         table.sort(compareSl)
//         return table
//     }
//     let list = [];
//     for (let i = 0; i < dataObj.length; i++) {
//         let Class = dataObj[i];
//         list.push({key: Class.letter + Class.num, label: Class.num + Class.letter, s: [Class.letter, Class.num]})
//     }
//     list = timeTableSort(list)
//     return list;
// }
//
// const Appy = () => {
//     document.title = "Панель Администратора";
//     const TimetableOption = getOptions(Data.getData('TimetableThursday'))
//     return (
//         <Layout>
//             <Header className="header">
//                 <div className={cl.logo}><img className={cl.logo} alt={""} src={logo}/></div>
//                 <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[1]} items={NavOption} />
//             </Header>
//             <Layout>
//                 <Sider
//                     width={200}
//                 >
//                     <Menu
//                         mode="inline"
//                         // defaultSelectedKeys={['1']}
//                         // defaultOpenKeys={['sub1']}
//                         style={{
//                             height: '100%',
//                             borderRight: 0,
//                         }}
//                         items={TimetableOption}
//                     />
//                 </Sider>
//                 <Layout
//                     style={{
//                         padding: '0 24px 24px',
//                     }}
//                 >
//                     <Breadcrumb
//                         style={{
//                             margin: '16px 0',
//                         }}
//                     >
//                         <Breadcrumb.Item>Home</Breadcrumb.Item>
//                         <Breadcrumb.Item>List</Breadcrumb.Item>
//                         <Breadcrumb.Item>App</Breadcrumb.Item>
//                     </Breadcrumb>
//                     <Content
//                         style={{
//                             padding: 24,
//                             margin: 0,
//                             minHeight: 280,
//                         }}>
//                         Content
//                     </Content>
//                 </Layout>
//             </Layout>
//         </Layout>
//     );
// };
// export default Appy;
