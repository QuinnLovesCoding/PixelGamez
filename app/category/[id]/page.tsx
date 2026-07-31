import { getCategoryById, getGamesByCategory } from '../../../lib/data';
import GameGrid from '../../../components/GameGrid';
import JsonLd from '../../../components/JsonLd';
import { notFound } from 'next/navigation';

export default async function CategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const category = getCategoryById(id);

  if (!category) {
    notFound();
  }

  const games = getGamesByCategory(category.id);

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": `${category.name} Games`,
    "description": `Play the best ${category.name} games on PixelGamez.`,
    "url": `https://www.pixelgamez.com/category/${category.id}`,
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": games.map((game, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "url": `https://www.pixelgamez.com/game/${game.id}`,
        "name": game.title
      }))
    }
  };

  return (
    <div className="category-page animate-fade-in">
      <JsonLd data={collectionSchema} />
      <GameGrid title={`${category.name} Games`} games={games} />
    </div>
  );
}
