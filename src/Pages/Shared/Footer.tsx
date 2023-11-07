import { BsLink45Deg } from "react-icons/bs"
import { FaShoppingCart } from "react-icons/fa"



function Footer() {
    return (
        <footer className={`bg-slate-950`}>
            <div className={`min-h-[10rem] max-w-[96rem] mx-auto w-screen grid grid-cols-1 lg:grid-cols-2 px-4 xs:px-8 md:px-24 lg:gap-x-60 xl:gap-x-72 gap-y-12 py-14`}>
                <div className={`flex justify-center`}>
                    <div>
                        <p className={`text-slate-300 text-2xl flex items-center gap-x-4`}>
                            Behind the scenes
                        </p>
                        <table className={`text-sm text-slate-400 mt-3`}>
                            <tbody>
                                <tr>
                                    <td className={`whitespace-nowrap`}>
                                        Source Code
                                    </td>
                                    <td className={`pl-2 xs:pl-8 flex`}>
                                        :
                                        <a
                                            href="https://github.com/anubhavsinghofficials/MernBazaar-frontend" 
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`text-slate-300 bg-slate-800  xs:px-2 hover:bg-slate-700 hover:text-slate-200 active:bg-slate-800 duration-75 flex items-center gap-x-2 ml-1`}
                                            >
                                                <BsLink45Deg/>
                                                FrontEnd
                                        </a>
                                        <a
                                            href="https://github.com/anubhavsinghofficials/MernBazaar-backend" 
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`text-slate-300 bg-slate-800  xs:px-2 hover:bg-slate-700 hover:text-slate-200 active:bg-slate-800 duration-75 flex items-center gap-x-2 ml-2`}
                                            >
                                                <BsLink45Deg/>
                                                BackEnd
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Stack
                                    </td>
                                    <td className={`pl-2 xs:pl-8`}>
                                        : MERN Stack
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Language
                                    </td>
                                    <td className={`pl-2 xs:pl-8`}>
                                        : TypeScript
                                    </td>
                                </tr>
                                <tr>
                                    <td className={`whitespace-nowrap`}>
                                        Styling
                                    </td>
                                    <td className={`pl-2 xs:pl-8`}>
                                        : Tailwind Css + ShadCn
                                    </td>
                                </tr>
                                <tr>
                                    <td className={`whitespace-nowrap`}>
                                        Client state
                                    </td>
                                    <td className={`pl-2 xs:pl-8`}>
                                        : Zustand
                                    </td>
                                </tr>
                                <tr>
                                    <td className={`whitespace-nowrap`}>
                                        Server state
                                    </td>
                                    <td className={`pl-2 xs:pl-8`}>
                                        : React Query
                                    </td>
                                </tr>
                                <tr>
                                    <td className={`whitespace-nowrap`}>
                                        Payment
                                    </td>
                                    <td className={`pl-2 xs:pl-8`}>
                                        : Stripe
                                    </td>
                                </tr>
                                <tr>
                                    <td className={`whitespace-nowrap`}>
                                        Complex Forms
                                    </td>
                                    <td className={`pl-2 xs:pl-8`}>
                                        : React Hook Forms + Zod
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Charts
                                    </td>
                                    <td className={`pl-2 xs:pl-8`}>
                                        : Recharts
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className={`flex flex-col items-center`}>
                    <div className={`grow flex flex-col`}>
                        <p className={`text-slate-300 text-2xl`}>
                            Contact Me
                        </p>
                        <table className={`text-sm text-slate-400 mt-3`}>
                            <tbody>
                                <tr>
                                    <td className={`hidden xs:block`}>
                                        Email
                                    </td>
                                    <td className={`xs:pl-8 whitespace-nowrap`}>
                                        <span className={`hidden xs:inline`}>: </span>
                                        anubhavsinghofficials@gmail.com
                                    </td>
                                </tr>
                                <tr>
                                    <td className={`hidden xs:block`}>
                                        Mobile
                                    </td>
                                    <td className={`xs:pl-8`}>
                                        <span className={`hidden xs:inline`}>: </span>
                                        +91-7982808427
                                    </td>
                                </tr>
                                <tr>
                                    <td className={`hidden xs:block`}>
                                        Github
                                    </td>
                                    <td className={`xs:pl-8`}>
                                        <span className={`hidden xs:inline`}>: </span>
                                        <a
                                            href="https://github.com/anubhavsinghofficials" 
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`text-slate-400 rounded-md hover:text-slate-200 duration-75 whitespace-nowrap`}
                                            >
                                            www.github.com/anubhavsinghofficials
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td className={`hidden xs:block`}>
                                        Linkedin
                                    </td>
                                    <td className={`xs:pl-8 whitespace-nowrap`}>
                                        <span className={`hidden xs:inline`}>: </span>
                                        <a
                                            href="https://www.linkedin.com/in/anubhavsinghofficials" 
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`text-slate-400 rounded-md hover:text-slate-200 duration-75`}
                                            >
                                            www.linkedin.com/in/anubhavsinghofficials
                                        </a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <p className={`text-slate-400 font-bold text-3xl grow items-end hidden lg:flex`}>
                            <span className={`flex items-center gap-x-4`}>
                                <FaShoppingCart className={`text-2xl`}/>
                                MernBazaar
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}
 
export default Footer