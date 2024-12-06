import { Link } from "react-router-dom"
import "./Menu.scss"
import home from '../../../assets/svg/home.svg'
import profile from '../../../assets/svg/profile.svg'
import product from '../../../assets/svg/product.svg'
import order from '../../../assets/svg/order.svg'
import log from '../../../assets/svg/log.svg'
import seller from '../../../assets/svg/seller.svg'
import page from '../../../assets/svg/page.svg'
import admin from '../../../assets/svg/admin.svg'


const Menu =  () => {
  return (
    <div className="menu">
        <div className="item">
            <span className="title">MAIN</span>
            {/* <Link to="/admin/" className="listItem">
                <img src={home} alt="" />
                <span className="listItemTitle">Home</span>
            </Link> */}
            <Link to="/admin/profile" className="listItem">
                <img src={admin} alt="admin" />
                <span className="listItemTitle">Profile</span>
            </Link>
            <span className="title">Gestion</span>
            {/* <Link to="/admin/page" className="listItem">
                <img src={page} alt="users" />
                <span className="listItemTitle">Pages</span>
            </Link>
            <Link to="/admin/products" className="listItem">
                <img src={product} alt="product" />
                <span className="listItemTitle">Produits</span>
            </Link> */}
            <Link to="/admin/user" className="listItem">
                <img src={profile} alt="users" />
                <span className="listItemTitle">Utilisateurs</span>
            </Link>
            <Link to="/admin/commercial" className="listItem">
                <img src={seller} alt="product" />
                <span className="listItemTitle">Commercials</span>
            </Link>
            {/* <span className="title">Listes</span> */}
            {/* <Link to="/admin/order" className="listItem">
                <img src={order} alt="product" />
                <span className="listItemTitle">Commandes</span>
            </Link> */}
            {/* <span className="title">Evènements</span>
            <Link to="/admin/log" className="listItem">
                <img src={log} alt="product" />
                <span className="listItemTitle">Journals</span>
            </Link> */}
        </div>
    </div>
  )
}

export default Menu