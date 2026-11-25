import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowDown, ArrowRight, Bike, ChevronLeft, ChevronRight, CircleStop, CloudRain, Compass, DoorOpen, Eye, Headphones, Lightbulb, MapPin, MoveUpRight, Route as RouteIcon, ShieldCheck, Smartphone, TrafficCone, Truck, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PodcastPlayer } from "@/components/podcast-player";
import { episode } from "@/lib/podcast";
import fotosRodada from "@/assets/rodada-mija-go.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Bogotá en bici · Muévete con más confianza" },
    { name: "description", content: "12 consejos para hacerte visible, anticipar maniobras y tomar mejores decisiones en el tráfico de Bogotá. Prepara tu próximo recorrido y escucha nuestro podcast." },
    { property: "og:title", content: "Bogotá en bici · Muévete con más confianza" },
    { property: "og:description", content: "Pequeñas decisiones que hacen más seguro tu recorrido. Consejos de ciclismo urbano y podcast en Bogotá." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Index,
});

const photos = [
  { src: fotosRodada.ciclorruta, alt: "Una ciclista con casco y camiseta amarilla circula por una ciclorruta separada del tráfico de Bogotá." },
  { src: fotosRodada.giro, alt: "Una ciclista con casco comprueba el tráfico detrás de ella y extiende el brazo izquierdo para señalizar un giro." },
  { src: fotosRodada.semaforo, alt: "Una ciclista espera ante un semáforo en rojo y deja espacio detrás del carro que tiene delante." },
];
const groups = [
  { name: "Antes de salir", icon: Compass, tips: [
    { title: "Planea tu ruta", text: "Prioriza ciclorrutas y calles con menos tráfico cuando estén disponibles.", icon: RouteIcon },
    { title: "Revisa tu bicicleta", text: "Comprueba los frenos, la presión de las llantas y el funcionamiento de las luces.", icon: Wrench },
    { title: "Ajusta el casco", text: "Llévalo nivelado y abrocha la correa.", icon: ShieldCheck },
    { title: "Hazte visible", text: "Usa luz blanca adelante y roja atrás cuando oscurezca o haya poca visibilidad.", icon: Lightbulb },
  ] },
  { name: "En medio del tráfico", icon: Bike, tips: [
    { title: "Anticipa tus giros", text: "Mira por encima del hombro y señaliza con tiempo cuando puedas hacerlo con seguridad.", icon: MoveUpRight },
    { title: "Evita los puntos ciegos", text: "Mantente fuera de los costados de buses y camiones, especialmente cuando se preparan para girar.", icon: Truck },
    { title: "Deja espacio junto a carros estacionados", text: "Circula con margen para reaccionar si alguien abre una puerta.", icon: DoorOpen },
    { title: "Respeta semáforos y cruces", text: "Reduce la velocidad al acercarte y cede el paso cuando corresponda.", icon: CircleStop },
  ] },
  { name: "Cuando cambian las condiciones", icon: CloudRain, tips: [
    { title: "Aumenta la distancia bajo la lluvia", text: "Frena con anticipación y reduce la velocidad en superficies lisas o pintadas.", icon: CloudRain },
    { title: "Mantén la atención en la vía", text: "Si necesitas mirar el celular, detente en un lugar seguro.", icon: Smartphone },
    { title: "Adapta la velocidad a lo que puedes ver", text: "Reduce el ritmo en cruces, curvas y zonas con tránsito peatonal.", icon: Eye },
    { title: "Elige por dónde pasar", text: "Anticipa huecos y rejillas, y comprueba que tienes espacio antes de cambiar de trayectoria.", icon: TrafficCone },
  ] },
];

function Index() {
  const [slide, setSlide] = useState(0);
  const photo = photos[slide] ?? photos[0];
  const changeSlide = (direction: number) => setSlide(current => (current + direction + photos.length) % photos.length);
  return (
    <>
      <header className="site-header" id="inicio"><div className="page-width flex h-full items-center justify-between gap-4">
        <a href="#inicio" className="brand"><Bike aria-hidden="true" /><span>Bogotá en bici<span className="text-primary">.</span></span></a>
        <nav aria-label="Navegación principal" className="hidden items-center gap-8 md:flex"><a href="#inicio" className="nav-link active">Inicio</a><a href="#consejos" className="nav-link">Consejos</a><a href="#podcast" className="nav-link">Podcast</a></nav>
        <Button asChild variant="hero" className="hidden h-10 gap-2 px-4 text-xs sm:inline-flex"><a href="#podcast"><Headphones />Escuchar podcast</a></Button>
        <Button asChild variant="darkGhost" className="gap-1 px-0 text-[10px] sm:hidden"><a href="#podcast"><Headphones /><span>Escuchar<br />podcast</span></a></Button>
      </div></header>
      <main>
        <section className="hero" aria-label="Ciclismo urbano en Bogotá" aria-roledescription="carrusel" onKeyDown={e => { if (e.key === "ArrowRight") { e.preventDefault(); changeSlide(1); } if (e.key === "ArrowLeft") { e.preventDefault(); changeSlide(-1); } }}>
          <img className="hero-image" src={photo?.src} alt={photo?.alt} fetchPriority="high" />
          <div className="hero-shade" />
          <div className="page-width hero-content"><span className="eyebrow text-primary"><span className="h-1.5 w-1.5 bg-primary" />Tu ciudad. Tu bici. Tu camino.</span>
            <h1>Muévete en bici<br />con más<br /><span className="text-primary">confianza.</span></h1>
            <p className="hero-description">Aprende a hacerte visible, anticipar maniobras y tomar mejores decisiones en el tráfico de Bogotá.</p>
            <div className="mt-7 flex flex-wrap gap-3"><Button asChild variant="campaign" size="lg"><a href="#consejos">Ver consejos<ArrowDown /></a></Button><Button asChild variant="hero" size="lg"><a href="#podcast"><Headphones />Escuchar podcast</a></Button></div>
          </div>
          <div className="page-width hero-bottom"><div className="flex items-center gap-1" aria-label="Seleccionar fotografía">{photos.map((item, index) => <Button key={item.src} variant="darkGhost" className="carousel-dot" aria-label={`Mostrar fotografía: ${item.alt}`} aria-pressed={slide === index} onClick={() => setSlide(index)} />)}</div><div className="flex gap-2"><Button variant="hero" size="icon" aria-label="Fotografía anterior" title="Fotografía anterior" onClick={() => changeSlide(-1)}><ChevronLeft /></Button><Button variant="hero" size="icon" aria-label="Fotografía siguiente" title="Fotografía siguiente" onClick={() => changeSlide(1)}><ChevronRight /></Button></div></div>
          <span className="sr-only" aria-live="polite">{photo?.alt}</span>
        </section>
        <div className="city-strip"><div className="page-width"><span className="strip-item"><MapPin size={17} />Bogotá se vive mejor sobre dos ruedas.</span><span className="strip-item"><ShieldCheck size={17} />Más atención. Mejores decisiones.</span><span className="strip-item"><Bike size={20} />Un recorrido a la vez.</span></div></div>
        <section id="consejos" className="page-width tips-section" aria-labelledby="tips-title">
          <div className="mb-10 flex items-end justify-between gap-8"><div><p className="eyebrow mb-4 text-muted-foreground"><span className="h-1.5 w-1.5 bg-highlight" />Consejos para rodar por Bogotá</p><h2 id="tips-title" className="section-heading max-w-2xl">Pequeñas decisiones que hacen<br className="hidden md:block" /> más seguro tu recorrido<span className="text-highlight">.</span></h2></div><span className="hidden max-w-40 pb-1 text-xs leading-6 text-muted-foreground lg:block">Para poner en práctica desde tu próxima salida.</span></div>
          <div className="space-y-9">{groups.map(group => <div key={group.name}><h3 className="group-title"><group.icon size={20} className="text-highlight" />{group.name}</h3><div className="tip-grid">{group.tips.map(tip => <article key={tip.title} className="tip-card"><tip.icon className="tip-icon" aria-hidden="true" /><h3>{tip.title}</h3><p>{tip.text}</p></article>)}</div></div>)}</div>
        </section>
        <section id="podcast" className="podcast-section" aria-labelledby="podcast-title"><div className="page-width podcast-layout">
          <div className="podcast-cover" aria-hidden="true"><div className="flex items-start justify-between"><span className="eyebrow">El podcast</span><Headphones /></div><p>{episode.show}</p></div>
          <div><p className="eyebrow mb-4 text-primary"><Headphones size={15} />{episode.show}</p><h2 id="podcast-title" className="section-heading max-w-2xl">{episode.title}</h2><PodcastPlayer /></div>
        </div></section>
        <section className="closing"><div className="page-width flex flex-wrap items-center justify-between gap-6"><div><p className="eyebrow mb-3 text-muted-foreground">Nos vemos en la vía</p><h2 className="section-heading">Prepara tu próximo recorrido<span className="text-highlight">.</span></h2></div><Button asChild variant="campaign" size="lg"><a href="#consejos">Volver a los consejos<ArrowRight /></a></Button></div></section>
      </main>
      <footer className="footer"><div className="page-width flex flex-wrap items-center justify-between gap-4"><a href="#inicio" className="brand text-lg"><Bike /><span>Bogotá en bici.</span></a><p className="text-[11px] text-muted-foreground">Una ciudad, muchos caminos. Rodemos con más cuidado.</p><a href="#inicio" className="flex items-center gap-2 text-xs text-muted-foreground">Volver arriba<ArrowDown size={14} className="rotate-180" /></a></div></footer>
    </>
  );
}
