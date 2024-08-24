import { Helmet } from 'react-helmet'
import Navbar from '../assets/components/navbar.jsx'
import Hero from '../assets/components/hero.jsx'
import Features1 from '../assets/components/features1.jsx'
import CTA from '../assets/components/cta.jsx'
import Features2 from '../assets/components/features2.jsx'
import Pricing from '../assets/components/pricing.jsx'
import Steps from '../assets/components/steps.jsx'
import Testimonial from '../assets/components/testimonial.jsx'
import Contact from '../assets/components/contact.jsx'
import Footer from '../assets/components/footer.jsx'
import '../components/styles/home.css'

const SignUp = () => {
  return (
    <div className="home-container">
      <Helmet>
        <title>Chat App</title>
      </Helmet>
      <Navbar></Navbar>
      <Hero></Hero>
      <Features1></Features1>
      <CTA></CTA>
      <Features2></Features2>
      <Pricing></Pricing>
      <Steps></Steps>
      <Testimonial></Testimonial>
      <Contact></Contact>
      <Footer></Footer>
    </div>
  )
}

export default SignUp
