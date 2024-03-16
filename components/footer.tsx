import Link from "next/link";
import { Big_Shoulders_Text } from 'next/font/google'

const font= Big_Shoulders_Text({ subsets: ['latin'] })
const footerBoxStyle = "flex flex-col " + font.className
const footerTitleStyle = "text-bg-color uppercase" + font.className
const footerItemStyle = "text-bg-color text-base uppercase mt-4d" + font.className

export default function Footer() {
  return (
    <div className={"bg-main-color py-10 " + font.className}>
      <div className="grid grid-cols-[60%_20%_20%] gap-4 mx-5">
        <div className={footerBoxStyle}>
          <h2 className="text-9xl text-bg-color uppercase">Site</h2>
          <div className="social">
            <Link href="#">
              <i className="bx bxl-instagram-alt"></i>
            </Link>
            <Link href="#">
              <i className="bx bxl-facebook"></i>
            </Link>
            <Link href="#">
              <i className="bx bxl-whatsapp"></i>
            </Link>
            <Link href="#">
              <i className="bx bxl-youtube"></i>
            </Link>
          </div>
        </div>
        <div className={footerBoxStyle}>
          <h3 className={footerTitleStyle}>Help</h3>
          <Link href="#" className={footerItemStyle}>Contact Us</Link>
          <Link href="#" className={footerItemStyle}>Shipment</Link>
          <Link href="#" className={footerItemStyle}>Payment</Link>
          <Link href="#" className={footerItemStyle}>Track Your Order</Link>
          <Link href="#" className={footerItemStyle}>Return Your Order</Link>
        </div>
        <div className={footerBoxStyle}>
          <h3 className={footerTitleStyle}>Legal Info</h3>
          <Link href="#" className={footerItemStyle}>Privacy Policy</Link>
          <Link href="#" className={footerItemStyle}>Terms & Condition</Link>
          <Link href="#" className={footerItemStyle}>Return Policy</Link>
          <Link href="#" className={footerItemStyle}>Comunity</Link>
          <Link href="#" className={footerItemStyle}>Get Card</Link>
        </div>
        <p className="text-bg-color uppercase pt-7">© Site Studio</p>
      </div>
    </div>
  );
}
