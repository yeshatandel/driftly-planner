import { useState } from "react"

import { listings } from "./data/listings.js"
import { Home } from "./pages/Home.jsx"
import { Explore } from "./pages/Explore.jsx"
import { PropertyDetails } from "./pages/PropertyDetails.jsx"
import { Wishlist } from "./pages/Wishlist.jsx"
import { SearchResults } from "./pages/SearchResults.jsx"
import UserDashboard from "./pages/UserDashboard.jsx"
import HostDashboard from "./pages/HostDashboard.jsx"
import { Login } from "./pages/Login.jsx"
import { Signup } from "./pages/Signup.jsx"
import { SignInExperience } from "./pages/SignInExperience.jsx"
import RegisterExperience from "./pages/RegisterExperience.jsx"
import { ForgotPassword } from "./pages/ForgotPassword.jsx"

export default function App() {
  const [activePage, setActivePage] = useState("home")
  const [selectedListing, setSelectedListing] = useState(listings[0])
  const [previousPage, setPreviousPage] = useState("explore")
  const [searchReturnPage, setSearchReturnPage] = useState("home")

  const openSearchFrom = (fromPage) => {
    setPreviousPage(fromPage)
    setSearchReturnPage(fromPage)
    setActivePage("search")
  }

  const openDashboard = (fromPage) => {
    setPreviousPage(fromPage)
    setActivePage("dashboard")
  }

  const openHostDashboard = (fromPage) => {
    setPreviousPage(fromPage)
    setActivePage("host")
  }

  const openAuth = (page, fromPage) => {
    setPreviousPage(fromPage)
    setActivePage(page)
  }

  if (activePage === "details") {
    return (
      <PropertyDetails
        listing={selectedListing}
        onPropertySelect={(listing) => {
          setSelectedListing(listing)
          setActivePage("details")
        }}
        onBack={() => setActivePage(previousPage)}
        onWishlistClick={() => {
          setPreviousPage("details")
          setActivePage("wishlist")
        }}
        onSearchClick={() => openSearchFrom("details")}
        onProfileClick={() => openDashboard("details")}
        onHostClick={() => openHostDashboard("details")}
        onAuthClick={(page) => openAuth(page, "details")}
      />
    )
  }

  if (activePage === "wishlist") {
    return (
      <Wishlist
        onBack={() => setActivePage(previousPage)}
        onExploreClick={() => {
          setPreviousPage("wishlist")
          setActivePage("explore")
        }}
        onPropertySelect={(listing) => {
          setSelectedListing(listing)
          setPreviousPage("wishlist")
          setActivePage("details")
        }}
        onSearchClick={() => openSearchFrom("wishlist")}
        onProfileClick={() => openDashboard("wishlist")}
        onHostClick={() => openHostDashboard("wishlist")}
        onAuthClick={(page) => openAuth(page, "wishlist")}
      />
    )
  }

  if (activePage === "explore") {
    return (
      <Explore
        onBack={() => setActivePage("home")}
        onPropertySelect={(listing) => {
          setSelectedListing(listing)
          setPreviousPage("explore")
          setActivePage("details")
        }}
        onWishlistClick={() => {
          setPreviousPage("explore")
          setActivePage("wishlist")
        }}
        onSearchClick={() => openSearchFrom("explore")}
        onProfileClick={() => openDashboard("explore")}
        onHostClick={() => openHostDashboard("explore")}
        onAuthClick={(page) => openAuth(page, "explore")}
      />
    )
  }

  if (activePage === "search") {
    return (
      <SearchResults
        onBack={() => setActivePage(searchReturnPage)}
        onPropertySelect={(listing) => {
          setSelectedListing(listing)
          setPreviousPage("search")
          setActivePage("details")
        }}
        onSearchClick={() => {
          setSearchReturnPage(searchReturnPage)
          setActivePage("search")
        }}
        onProfileClick={() => openDashboard("search")}
        onHostClick={() => openHostDashboard("search")}
        onAuthClick={(page) => openAuth(page, "search")}
      />
    )
  }

  if (activePage === "dashboard") {
    return <UserDashboard onBack={() => setActivePage(previousPage)} />
  }

  if (activePage === "host") {
    return <HostDashboard onBack={() => setActivePage(previousPage)} />
  }

  if (activePage === "login") {
    return <SignInExperience onBack={() => setActivePage(previousPage)} onCreatePassport={() => openAuth("register", "login")} onForgotPassword={() => openAuth("forgot", "login")} />
  }

  if (activePage === "register") {
    return <RegisterExperience onBack={() => setActivePage(previousPage)} />
  }

  if (activePage === "signup") {
    return <Signup onBack={() => setActivePage(previousPage)} onSwitchToLogin={() => openAuth("login", "signup")} />
  }

  if (activePage === "forgot") {
    return <ForgotPassword onBack={() => setActivePage(previousPage)} onSwitchToLogin={() => openAuth("login", "forgot")} />
  }

  return (
    <Home
      onExploreClick={() => {
        setPreviousPage("home")
        setActivePage("explore")
      }}
      onWishlistClick={() => {
        setPreviousPage("home")
        setActivePage("wishlist")
      }}
      onSearchClick={() => openSearchFrom("home")}
      onPropertySelect={(listing) => {
        setSelectedListing(listing)
        setPreviousPage("home")
        setActivePage("details")
      }}
      onProfileClick={() => openDashboard("home")}
      onHostClick={() => openHostDashboard("home")}
      onAuthClick={(page) => openAuth(page, "home")}
    />
  )
}
