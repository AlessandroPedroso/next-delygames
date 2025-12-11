import { Container } from "@/components/container";
import { GameProps } from "@/utils/types/game";
import Image from "next/image";
import { redirect } from "next/navigation";

interface PageGameProps {
  params: Promise<{ id: string }>;
}

async function getData(id: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_API_URL}/next-api/?api=game&id=${id}`
    );

    return res.json();
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
}

export default async function Game({ params }: PageGameProps) {
  const { id } = await params;
  const game: GameProps = await getData(id);

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
      </Container>
    </main>
  );
}
