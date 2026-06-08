import { SearchDiscoveryPage } from "../components/discovery/SearchDiscoveryPage.jsx"
import { listings } from "../data/listings.js"

export function SearchResults({ onBack, onPropertySelect, onSearchClick, onProfileClick, onHostClick, onAuthClick }) {
  return (
    <SearchDiscoveryPage
      items={listings.slice(0, 12)}
      onBack={onBack}
      onPropertySelect={onPropertySelect}
      onSearchClick={onSearchClick}
      onProfileClick={onProfileClick}
      onHostClick={onHostClick}
      onAuthClick={onAuthClick}
    />
  )
}
