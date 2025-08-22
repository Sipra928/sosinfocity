import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import './styles.scss'

const routes = {
    "/": "og",
    "/about": "About",
    "/service": "Service",
    "/client": "Client",
    "/contact": "Contact",
}

const anim = (variants) => {
    return {
        initial: 'initial',
        animate: 'enter',
        exit: 'exit',
        variants,
    }
}

const Curve = ({ children }) => {
    const [dimensions, setDimensions] = useState({ height: 0, width: 0 })
    const location = useLocation()

    useEffect(() => {
        const resize = () => {
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight,
            })
        }
        resize()
        window.addEventListener('resize', resize)
        return () => window.removeEventListener('resize', resize)
    }, [])

    // current page name from dictionary

    const currentPageName = routes[location.pathname] || "Page"
    const text = {
        initial: {
            opacity: 1,

        },
        enter: {
            opacity: 0,
            top: -100,
            transition: {
                duration: 0.75,
                delay: 0.3,
                ease: [0.76, 0, 0.24, 1]
            },
            transitionEnd: {
                top: '47.5%'
            }

        },
        exit: {
            opacity: 1,
            top: "40%",
            transition: {
                duration: 0.5,
                delay: 0.4,
                ease: [0.33, 1, 0.68, 1]
            },
        }
    }
    console.log(currentPageName)


    return (
        <div className="page curve">
            <motion.p  {...anim(text)} className='route'>
                vv
            </motion.p>
            <div
                style={{ opacity: dimensions.width > 0 ? 0 : 1 }}
                className="background"
            ></div>

            {/* Your animated curve */}
            {dimensions.width > 0 && <SVG {...dimensions} />}

            {/* Show current page name */}


            {children}
        </div>
    )
}

export default Curve

const SVG = ({ width, height }) => {
    const initialPath = `
    M0 300
    Q${width / 2} 0 ${width} 300
    L${width} ${height + 300}
    Q${width / 2} ${height + 600} 0 ${height + 300}
    L0 300
  `
    const targetPath = `
    M0 300
    Q${width / 2} 0 ${width} 300
    L${width} ${height}
    Q${width / 2} ${height} 0 ${height}
    L0 300
  `

    const curve = {
        initial: { d: initialPath },
        enter: {
            d: targetPath,
            transition: { duration: 0.75, delay: 0.3, ease: [0.76, 0, 0.24, 1] },
        },
        exit: {
            d: initialPath,
            transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] },
        },
    }

    const slide = {
        initial: { top: "-300px" },
        enter: {
            top: "-100vh",
            transition: { duration: 0.75, delay: 0.3, ease: [0.76, 0, 0.24, 1] },
            transitionEnd: { top: "100vh" },
        },
        exit: {
            top: "-300px",
            transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] },
        },
    }

    return (
        <motion.svg {...anim(slide)}>
            <motion.path d={initialPath} {...anim(curve)} fill="#111" />
        </motion.svg>
    )
}
