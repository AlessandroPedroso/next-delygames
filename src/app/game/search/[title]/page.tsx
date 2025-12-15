//arquivos de paginas, ou seja page.tsx sempre precisam exportar um componente padrão como default!
import { Container } from "@/components/container";
import { GameCard } from "@/components/GameCard";
import { Input } from "@/components/input";
import { GameProps } from "@/utils/types/game";

interface PageSearchProps {
  params: Promise<{ title: string }>;
}

async function getData(title: string) {
  // console.log("PARAMETRO" + title);

  try {
    const decodeTitle = decodeURI(title);

    const res = await fetch(
      `${process.env.NEXT_API_URL}/next-api/?api=game&title=${decodeTitle}`,
      { cache: "no-store" }
    );
    return res.json();
  } catch (error) {
    return null;
  }
}

export default async function Search({ params }: PageSearchProps) {
  const { title } = await params;
  const games: GameProps[] = await getData(title);

  return (
    <main className="w-full text-black">
      <Container>
        <Input />
        <h1 className="text-center font-bold text-xl mt-8 mb-5">
          Veja o que encontramos na nossa base:
        </h1>
        {!games && <p>Esse jogo não foi encontrado!...</p>}

        <section className="grid gap-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {games && games.map((item) => <GameCard key={item.id} data={item} />)}
        </section>
      </Container>
    </main>
  );
}
