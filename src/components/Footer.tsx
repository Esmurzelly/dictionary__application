import github from '@/assets/logo/github.png';
import telegram from '@/assets/logo/telegram.png';
import instagram from '@/assets/logo/instagram.png';
import appLogo from '@/assets/favicon.svg'
import { motion } from 'framer-motion'

const Footer = () => {
  return (
    <motion.div
      className='max-w-7xl mx-auto mt-8 w-full'
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      variants={{
        hidden: { opacity: 0, x: -100 },
        visible: { opacity: 1, x: 0 }
      }}>
      <div className='flex justify-between items-center'>
        <img className='w-9' src={appLogo} alt="" />

        <div className='flex flex-col items-end gap-2'>
          <div className='logos flex gap-1'>
            <a href="https://github.com/Esmurzelly">
              <img className='w-8 cursor-pointer rounded-xl bg-white' src={github} alt="github" />

            </a>
            <a href="https://t.me/Esmurzelly">
              <img className='w-8 cursor-pointer rounded-xl bg-white' src={telegram} alt="telegram" />

            </a>
            <a href="https://www.instagram.com/esmurzelly">
              <img className='w-8 cursor-pointer rounded-xl bg-white' src={instagram} alt="instagram" />

            </a>
          </div>
          <p className='text-sm'>CopyRight 2023. All Right Reserved</p>
        </div>
      </div>

    </motion.div>
  )
}

export default Footer