import { Layout } from "antd";

const { Footer } = Layout;
const FooterSection = () => {
    return (
        <Footer style={{ backgroundColor: '#ffff' }} className="text-center">
            Home24 BXP  ©{new Date().getFullYear()} Created by Geeth Wishkamal
        </Footer>
    )
}

export default FooterSection