import Listing from './components/Listing';
import items from './etsy.json';

export default function App() {
  return <main className="container"><Listing items={items} /></main>;
}
