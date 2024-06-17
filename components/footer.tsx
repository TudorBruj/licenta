import Link from 'next/link';
import { Big_Shoulders_Text } from 'next/font/google';

const font = Big_Shoulders_Text({ subsets: ['latin'] });
const footerBoxStyle = 'flex flex-col ' + font.className;
const footerTitleStyle = 'text-bg-color uppercase' + font.className;
const footerItemStyle =
  'text-bg-color text-base uppercase mt-4d' + font.className;

export default function Footer() {
  return (
    <div className={'bg-main-color p-5 ' + font.className}>
      <div className='grid grid-cols-[60%_20%_20%]'>
        <div className={footerBoxStyle}>
          <h2 className='text-9xl uppercase text-bg-color'>Hanger</h2>
          <div className='social'>
            <Link href='#'>
              <i className='bx bxl-instagram-alt'></i>
            </Link>
            <Link href='#'>
              <i className='bx bxl-facebook'></i>
            </Link>
            <Link href='#'>
              <i className='bx bxl-whatsapp'></i>
            </Link>
            <Link href='#'>
              <i className='bx bxl-youtube'></i>
            </Link>
          </div>
        </div>
        <p className='pt-7 uppercase text-bg-color'>© Hanger Studio</p>
      </div>
    </div>
  );
}
