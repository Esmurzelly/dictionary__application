type Props = {
    children: any
}

const Layout = ({children}: Props) => {
  return (
    <div className='w-max-[1240px] h-screen'>
        {children}
    </div>
  )
}

export default Layout