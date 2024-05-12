import { Header } from 'antd/es/layout/layout';
import { Button} from 'antd';
import { Link } from 'react-router-dom';



const Navbar: React.FC = () => {
    return(
        <>
        <Header style={{display:'flex', justifyContent:'start', alignItems:'center', gap:'30px'}}>
        <Button>
         <Link to="/">Login</Link>
         </Button>
         <Button>
         <Link to="/user/create">LoginNew</Link>
         </Button>
         <Button>
         <Link to="/admin/password">Password History</Link>
         </Button>
         <Button>
         <Link to="/admin/block">Block Records</Link>
         </Button>
         <Button>
           <Link to="/admin">Admin</Link>
         </Button>
         <Button>
           <Link to="/admin/prime">Prime Users</Link>
         </Button>
       </Header></>
    )
}

export default Navbar