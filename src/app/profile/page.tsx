import { Container } from "@/components/container";
import Image from "next/image";
import { FaShareAlt } from "react-icons/fa";

export default function Profile() {
  return (
    <main className="w-full text-black">
      <Container>
        <section className="mt-8 mb-6 flex flex-col items-center justify-between relative gap-3 sm:flex-row">
          <div className="w-full flex items-center gap-4 text-lg flex-col sm:flex-row justify-center sm:justify-normal">
            <Image
              src="/user.png"
              width={440}
              height={379}
              alt="Imagem perfil do Usuário"
              className="rounded-full w-56 h-56 object-cover"
            />
            <h1 className="font-bold text-2xl">Alessandro Pedroso</h1>
          </div>
          <div className="sm:absolute top-0 right-0 flex gap-3 items-center justify-center">
            <button className="bg-gray-700 px-4 py-3 rounded-lg text-white">
              Configurações
            </button>
            <button className="bg-gray-700 px-4 py-3 rounded-lg">
              <FaShareAlt size={24} color="#FFF" />
            </button>
          </div>
        </section>
      </Container>
    </main>
  );
}
