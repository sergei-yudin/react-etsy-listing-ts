export interface ListingItem {
  listing_id: number;
  url?: string | null;
  MainImage?: { url_570xN?: string | null } | null;
  title?: string | null;
  currency_code?: string | null;
  price?: string | null;
  quantity?: number | null;
}

interface ListingProps {
  items?: ListingItem[];
}

const formatTitle = (title: string) => title.length > 50 ? `${title.slice(0, 50)}…` : title;

const formatPrice = (code: string, price: string) => {
  const symbols: Record<string, string> = { USD: '$', EUR: '€', GBP: '£' };
  return symbols[code] ? `${symbols[code]}${price}` : `${code} ${price}`;
};

const stockClass = (quantity: number) => {
  if (quantity <= 10) return 'stock-low';
  if (quantity <= 20) return 'stock-medium';
  return 'stock-high';
};

export default function Listing({ items = [] }: ListingProps) {
  const validItems = items.filter((item) => item.url && item.MainImage?.url_570xN && item.title && item.currency_code && item.price && item.quantity !== null && item.quantity !== undefined);

  return (
    <div className="product-grid">
      {validItems.map((item) => (
        <a className="product-card" href={item.url!} key={item.listing_id} target="_blank" rel="noreferrer">
          <img className="product-image" src={item.MainImage!.url_570xN!} alt={item.title!} />
          <div className="product-info">
            <h3 className="product-title">{formatTitle(item.title!)}</h3>
            <div className="price-container">
              <div className="product-price">{formatPrice(item.currency_code!, item.price!)}</div>
              <span className={`stock-badge ${stockClass(item.quantity!)}`}>{item.quantity} left</span>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}
