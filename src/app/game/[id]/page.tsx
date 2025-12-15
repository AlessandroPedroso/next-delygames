import { Container } from "@/components/container";
import { GameCard } from "@/components/GameCard";
import { GameProps } from "@/utils/types/game";
import { Metadata } from "next";
import Image from "next/image";
import { redirect } from "next/navigation";
import { Label } from "./components/label";

interface PageGameProps {
  params: Promise<{ id: string }>;
}

//gera o metadadata dinâmico para cada jogo
export async function generateMetadata({
  params,
}: PageGameProps): Promise<Metadata> {
  const { id } = await params;

  try {
    // {cache: 'no-store'} para não guardar em cache e sempre buscar o dado atualizado
    const response: GameProps = await fetch(
      `${process.env.NEXT_API_URL}/next-api/?api=game&id=${id}`,
      { cache: "no-store" }
    )
      .then((res) => res.json())
      .catch(() => {
        return {
          title: "DalyGames - Descrubra jogos incríveis para se divertir.",
        };
      });

    return {
      title: response.title,
      description: `${response.description.slice(0, 100)}...`,
      openGraph: {
        title: response.title,
        images: [response.image_url],
      },
      robots: {
        index: true,
        follow: true,
        nocache: true,
        googleBot: {
          index: true,
          follow: true,
          noimageindex: true,
        },
      },
    };
  } catch (error) {
    return {
      title: "DalyGames - Descrubra jogos incríveis para se divertir.",
    };
  }
}

async function getData(id: string) {
  try {
    // {cache: 'no-store'} para não guardar em cache e sempre buscar o dado atualizado
    const res = await fetch(
      `${process.env.NEXT_API_URL}/next-api/?api=game&id=${id}`,
      { cache: "no-store" }
    );

    return res.json();
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
}

async function getGameSorted() {
  try {
    const res = await fetch(
      `${process.env.NEXT_API_URL}/next-api/?api=game_day`,
      { next: { revalidate: 320 } }
    );
    return res.json();
  } catch (err) {
    throw new Error("Failed to fetch data");
  }
}

export default async function Game({ params }: PageGameProps) {
  const { id } = await params;
  const game: GameProps = await getData(id);
  const sortedGame: GameProps = await getGameSorted();

  //se não encontrar o jogo no parametro
  if (!game) {
    redirect("/");
  }

  return (
    <main className="w-full text-black">
      <div className="bg-black h-80 sm:h-96 w-full relative">
        <Image
          className="object-cover w-full h-80 sm:h-96 opacity-75"
          src={game.image_url}
          alt={game.title}
          priority={true}
          fill={true}
          quality={100}
          sizes="(max-width:768px) 100vw, (max-width:1200px) 44vw"
        />
      </div>
      <Container>
        <h1 className="font-bold text-xl my-4">{game.title}</h1>
        <p>{game.description}</p>
        <h2 className="font-bold text-lg mt-7 mb-2">Plataformas</h2>

        <div className="flex gap-2 flex-wrap">
          {game.platforms.map((item) => (
            <Label name={item} key={item} />
          ))}
        </div>

        <h2 className="font-bold text-lg mt-7 mb-2">Categorias</h2>

        <div className="flex gap-2 flex-wrap">
          {game.categories.map((item) => (
            <Label name={item} key={item} />
          ))}
        </div>

        <p className="mt-7 mb-2">
          <strong>Data de lançamento: </strong>
          {game.release}
        </p>

        <h2 className="font-bold text-lg mt-7 mb-2">Jogo recomendado:</h2>
        <div className="flex">
          <div className="grow">
            <GameCard data={sortedGame} />
          </div>
        </div>
      </Container>
    </main>
  );
}
