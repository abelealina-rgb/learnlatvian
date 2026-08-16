import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import logo from "@/assets/abolkuka-logo.jpg.asset.json";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ābolkūka — Learn Latvian with Videos & Exercises" },
      {
        name: "description",
        content:
          "Ābolkūka is a friendly one-stop place to learn Latvian: short video lessons, interactive vocabulary and grammar exercises, and a way to get in touch.",
      },
      { property: "og:title", content: "Ābolkūka — Learn Latvian" },
      {
        property: "og:description",
        content:
          "Short Latvian video lessons and interactive exercises for beginners. Learn Latvian the sweet way.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const videos = [
  {
    id: "Kk4Cv1qCFxE",
    title: "Latvian alphabet & pronunciation",
    note: "Start here: the sounds behind ā, č, ē, ģ, ī, ķ, ļ, ņ, š, ū, ž.",
  },
  {
    id: "gEDmzD3q6Zg",
    title: "First 50 everyday words",
    note: "Greetings, food, family — the words you'll use on day one.",
  },
  {
    id: "8sYlLXOZP0M",
    title: "Cases made simple",
    note: "A gentle intro to Latvian noun cases without the headache.",
  },
];

type Quiz = {
  question: string;
  hint: string;
  options: string[];
  answer: number;
};

const quiz: Quiz[] = [
  {
    question: 'How do you say "Good morning" in Latvian?',
    hint: "Literally: good morning",
    options: ["Labdien", "Labrīt", "Labvakar", "Sveiki"],
    answer: 1,
  },
  {
    question: 'Which word means "apple"?',
    hint: "It is hiding in the name Ābolkūka.",
    options: ["Ābols", "Bumbieris", "Ķirsis", "Plūme"],
    answer: 0,
  },
  {
    question: 'Complete: "Es ___ Latvijā." (I live in Latvia)',
    hint: "Verb dzīvot in 1st person singular.",
    options: ["dzīvo", "dzīvoju", "dzīvojam", "dzīvot"],
    answer: 1,
  },
  {
    question: 'What is "thank you"?',
    hint: "You will hear it in every shop.",
    options: ["Lūdzu", "Atvainojiet", "Paldies", "Uz redzēšanos"],
    answer: 2,
  },
  {
    question: 'Which is the correct plural of "grāmata" (book)?',
    hint: "Feminine nouns ending in -a take -as.",
    options: ["grāmatas", "grāmatai", "grāmatu", "grāmati"],
    answer: 0,
  },
];

const matchPairs = [
  { lv: "suns", en: "dog" },
  { lv: "kaķis", en: "cat" },
  { lv: "maize", en: "bread" },
  { lv: "ūdens", en: "water" },
];

function Nav() {
  const items = [
    ["#project", "Project"],
    ["#about", "About me"],
    ["#videos", "Videos"],
    ["#exercises", "Exercises"],
    ["#contact", "Contact"],
  ];
  return (
    <nav className="sticky top-0 z-30 border-b-[3px] border-grape bg-sky/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-3 px-4 py-3">
        <a href="#top" className="flex items-center gap-2">
          <img src={logo.url} alt="Ābolkūka logo" className="h-11 w-11 rounded-full border-2 border-grape" />
          <span className="font-display text-xl font-extrabold text-grape">Ābolkūka</span>
        </a>
        <ul className="ml-auto flex flex-wrap gap-1 text-sm font-bold">
          {items.map(([href, label]) => (
            <li key={href}>
              <a
                href={href}
                className="rounded-full px-3 py-1.5 text-grape transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mx-auto max-w-5xl scroll-mt-24 px-4 py-14">
      <p className="font-display text-sm font-bold uppercase tracking-[0.2em] text-primary">{eyebrow}</p>
      <h2 className="mt-1 text-3xl font-extrabold text-grape sm:text-4xl">{title}</h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}

function QuizExercise() {
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const q = quiz[index]!;

  const choose = (i: number) => {
    if (picked !== null) return;
    setPicked(i);
    if (i === q.answer) setScore((s) => s + 1);
  };

  const next = () => {
    if (index + 1 === quiz.length) {
      setDone(true);
      return;
    }
    setIndex(index + 1);
    setPicked(null);
  };

  const restart = () => {
    setIndex(0);
    setPicked(null);
    setScore(0);
    setDone(false);
  };

  if (done) {
    return (
      <div className="card-pop rounded-2xl p-6 text-center">
        <h3 className="text-2xl font-extrabold text-grape">
          {score} / {quiz.length}
        </h3>
        <p className="mt-2 text-muted-foreground">
          {score === quiz.length
            ? "Lieliski! Perfect score — you are ready for the next lesson."
            : "Labi darīts! Review the videos and try again."}
        </p>
        <Button onClick={restart} className="mt-5 rounded-full font-bold">
          Try again
        </Button>
      </div>
    );
  }

  return (
    <div className="card-pop rounded-2xl p-6">
      <div className="flex items-center justify-between text-sm font-bold text-muted-foreground">
        <span>
          Question {index + 1} of {quiz.length}
        </span>
        <span>Score {score}</span>
      </div>
      <h3 className="mt-3 text-xl font-extrabold text-grape">{q.question}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{q.hint}</p>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {q.options.map((option, i) => {
          const isRight = i === q.answer;
          const state =
            picked === null
              ? "border-border bg-background hover:border-grape"
              : isRight
                ? "border-accent bg-accent text-accent-foreground"
                : picked === i
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-muted text-muted-foreground";
          return (
            <button
              key={option}
              onClick={() => choose(i)}
              className={`rounded-xl border-2 px-4 py-3 text-left font-bold transition-colors ${state}`}
            >
              {option}
            </button>
          );
        })}
      </div>
      {picked !== null && (
        <div className="mt-5 flex items-center justify-between gap-3">
          <p className="text-sm font-bold text-grape">
            {picked === q.answer ? "Pareizi! Correct." : `Nepareizi. Correct: ${q.options[q.answer]}`}
          </p>
          <Button onClick={next} className="rounded-full font-bold">
            {index + 1 === quiz.length ? "See result" : "Next"}
          </Button>
        </div>
      )}
    </div>
  );
}

function MatchExercise() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const options = ["", ...matchPairs.map((p) => p.en)];

  const correctCount = matchPairs.filter((p) => answers[p.lv] === p.en).length;

  return (
    <div className="card-pop rounded-2xl p-6">
      <h3 className="text-xl font-extrabold text-grape">Match the word</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Pick the English meaning for each Latvian word.
      </p>
      <div className="mt-5 space-y-3">
        {matchPairs.map((p) => {
          const value = answers[p.lv] ?? "";
          const state =
            value === ""
              ? "border-border"
              : value === p.en
                ? "border-accent bg-accent/40"
                : "border-primary bg-primary/15";
          return (
            <div key={p.lv} className="flex items-center gap-3">
              <span className="w-28 font-display text-lg font-extrabold text-grape">{p.lv}</span>
              <select
                value={value}
                onChange={(e) => setAnswers({ ...answers, [p.lv]: e.target.value })}
                className={`flex-1 rounded-xl border-2 bg-background px-3 py-2 font-bold ${state}`}
                aria-label={`Meaning of ${p.lv}`}
              >
                {options.map((o) => (
                  <option key={o} value={o}>
                    {o === "" ? "Choose…" : o}
                  </option>
                ))}
              </select>
            </div>
          );
        })}
      </div>
      <p className="mt-4 text-sm font-bold text-grape">
        {correctCount} of {matchPairs.length} matched correctly
      </p>
    </div>
  );
}

function ContactForm() {
  const [sending, setSending] = useState(false);

  return (
    <form
      className="card-pop grid gap-4 rounded-2xl p-6"
      onSubmit={(e) => {
        e.preventDefault();
        setSending(true);
        const form = e.currentTarget;
        setTimeout(() => {
          setSending(false);
          form.reset();
          toast.success("Paldies! Your message has been noted.");
        }, 500);
      }}
    >
      <div className="grid gap-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" required placeholder="Anna" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" required placeholder="anna@example.com" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="message">Message</Label>
        <Textarea id="message" name="message" required rows={5} placeholder="Sveiki! I would like to…" />
      </div>
      <Button type="submit" disabled={sending} className="rounded-full font-bold">
        {sending ? "Sending…" : "Send message"}
      </Button>
      <p className="text-xs text-muted-foreground">
        This form is not connected to email yet — ask to hook it up and messages can be delivered to your
        inbox.
      </p>
    </form>
  );
}

function Index() {
  return (
    <div id="top" className="min-h-screen">
      <Nav />

      <header className="mx-auto grid max-w-5xl items-center gap-8 px-4 py-14 md:grid-cols-[1.1fr_0.9fr]">
        <div>
          <h1 className="text-4xl font-extrabold leading-tight text-grape sm:text-5xl">
            Learn Latvian, one sweet slice at a time
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Ābolkūka is a small, friendly Latvian learning corner: short video lessons, bite-sized
            exercises and no pressure. Just like apple cake — simple ingredients, great result.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild className="rounded-full font-bold">
              <a href="#videos">Watch the videos</a>
            </Button>
            <Button
              asChild
              variant="secondary"
              className="rounded-full border-2 border-grape font-bold text-grape"
            >
              <a href="#exercises">Try an exercise</a>
            </Button>
          </div>
        </div>
        <img
          src={logo.url}
          alt="Ābolkūka logo: an apple cake with green apples"
          className="mx-auto w-64 rounded-full border-[3px] border-grape shadow-[8px_8px_0_var(--grape)] md:w-full md:max-w-sm"
        />
      </header>

      <Section id="project" eyebrow="What is this" title="A cosy place to pick up Latvian">
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            {
              t: "Short video lessons",
              d: "Every lesson focuses on one thing: a sound, a set of words, one grammar rule.",
            },
            {
              t: "Practice right away",
              d: "Interactive quizzes and matching exercises so new words actually stick.",
            },
            {
              t: "Beginner friendly",
              d: "No linguistics degree needed. Latvian explained in plain, everyday English.",
            },
          ].map((c) => (
            <div key={c.t} className="card-pop rounded-2xl p-5">
              <h3 className="text-lg font-extrabold text-grape">{c.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{c.d}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="about" eyebrow="Who am I" title="Sveiki, I'm Alina">
        <div className="card-pop rounded-2xl p-6">
          <p className="text-muted-foreground">
            I'm a Latvian speaker who loves teaching my language to curious people around the world. I
            started Ābolkūka because most Latvian resources felt either too academic or too scattered. Here
            you get the version I wish I had: friendly, visual, and practical from the first lesson.
          </p>
          <p className="mt-4 text-muted-foreground">
            When I'm not recording lessons, I'm probably baking the cake this project is named after.
          </p>
        </div>
      </Section>

      <Section id="videos" eyebrow="Videos" title="Watch and repeat">
        <div className="grid gap-6 md:grid-cols-2">
          {videos.map((v) => (
            <article key={v.id} className="card-pop overflow-hidden rounded-2xl">
              <div className="aspect-video w-full bg-muted">
                <iframe
                  className="h-full w-full"
                  src={`https://www.youtube.com/embed/${v.id}`}
                  title={v.title}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-extrabold text-grape">{v.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{v.note}</p>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          Want to add your own lessons? Replace the YouTube IDs in the video list and they appear here.
        </p>
      </Section>

      <Section id="exercises" eyebrow="Exercises" title="Practise your Latvian">
        <div className="grid gap-6 lg:grid-cols-2">
          <QuizExercise />
          <MatchExercise />
        </div>
      </Section>

      <Section id="contact" eyebrow="Contact" title="Say sveiki">
        <ContactForm />
      </Section>

      <footer className="border-t-[3px] border-grape bg-sky/70 py-6 text-center text-sm font-bold text-grape">
        Ābolkūka — Learn Latvian · Made with apple cake and patience
      </footer>
    </div>
  );
}
