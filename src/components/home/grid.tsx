import { Calendar } from "@/components/ui/calendar";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { BentoCard, BentoGrid } from "@/components/home/magicui/bento-grid";
import Globe from "@/components/home/magicui/globe";
import Marquee from "@/components/home/magicui/marquee";
import {
  CalendarIcon,
  FileTextIcon,
  GlobeIcon,
  InputIcon,
} from "@radix-ui/react-icons";
const files = [
  {
    name: "bitcoin.pdf",
    body: "البيتكوين هو عملة رقمية اخترعت في عام 2008 من قبل شخص مجهول أو مجموعة من الأشخاص باستخدام اسم ساتوشي ناكاموتو.",
  },
  {
    name: "finances.xlsx",
    body: "جدول بيانات أو ورقة عمل هو ملف مكون من صفوف وأعمدة تساعد في فرز البيانات وترتيبها بسهولة وحساب البيانات العددية.",
  },
  {
    name: "logo.svg",
    body: "الرسومات القابلة للتوسيع هي صيغة صور ناقلة قائمة على لغة ترميز وسمية للرسوميات ثنائية الأبعاد مع دعم للتفاعل والرسوم المتحركة.",
  },
  {
    name: "keys.gpg",
    body: "تُستخدم مفاتيح GPG لتشفير وفك تشفير البريد الإلكتروني والملفات والدلائل وأقسام القرص بأكملها ولمصادقة الرسائل.",
  },
  {
    name: "seed.txt",
    body: "عبارة البذور أو عبارة الاستعادة من البذور أو عبارة النسخ الاحتياطي للبذور هي قائمة من الكلمات التي تخزن جميع المعلومات اللازمة لاستعادة أموال البيتكوين على السلسلة.",
  },
];

const features = [
  {
    Icon: FileTextIcon,
    name: "حفظ ملفاتك",
    description: "نحن نحفظ ملفاتك تلقائيًا أثناء كتابتك.",
    href: "/",
    cta: "تعلم المزيد",
    className: "col-span-3 lg:col-span-1",
    background: (
      <Marquee
        pauseOnHover
        className="absolute top-10 [--duration:20s] [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] "
      >
        {files.map((f, idx) => (
          <figure
            key={idx}
            className={cn(
              "relative w-32 cursor-pointer overflow-hidden rounded-xl border p-4",
              "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
              "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
              "transform-gpu blur-[1px] transition-all duration-300 ease-out hover:blur-none",
            )}
          >
            <div className="flex flex-row items-center gap-2">
              <div className="flex flex-col">
                <figcaption className="text-sm font-medium dark:text-white ">
                  {f.name}
                </figcaption>
              </div>
            </div>
            <blockquote className="mt-2 text-xs">{f.body}</blockquote>
          </figure>
        ))}
      </Marquee>
    ),
  },
  {
    Icon: InputIcon,
    name: "بحث نصي كامل",
    description: "ابحث في جميع ملفاتك في مكان واحد.",
    href: "/",
    cta: "تعلم المزيد",
    className: "col-span-3 lg:col-span-2",
    background: (
      <Command className="absolute right-10 top-10 w-[70%] origin-top translate-x-0 border transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] group-hover:-translate-x-10">
        <CommandInput placeholder="اكتب أمرًا أو ابحث..." />
        <CommandList>
          <CommandEmpty>لم يتم العثور على نتائج.</CommandEmpty>
          <CommandGroup heading="اقتراحات">
            <CommandItem>screenshot.png</CommandItem>
            <CommandItem>bitcoin.pdf</CommandItem>
            <CommandItem>finances.xlsx</CommandItem>
            <CommandItem>logo.svg</CommandItem>
            <CommandItem>keys.gpg</CommandItem>
            <CommandItem>seed.txt</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    ),
  },
  {
    Icon: GlobeIcon,
    name: "متعدد اللغات",
    description: "يدعم أكثر من 100 لغة ولا يزال العد.",
    href: "/",
    cta: "تعلم المزيد",
    className: "col-span-3 lg:col-span-2",
    background: (
      <Globe
      
      className="top-0 h-[600px] w-[600px] transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_30%,#000_100%)] group-hover:scale-105 sm:left-40" />
    ),
  },
  {
    Icon: CalendarIcon,
    name: "تقويم",
    description: "استخدم التقويم لتصفية ملفاتك حسب التاريخ.",
    className: "col-span-3 lg:col-span-1",
    href: "/",
    cta: "تعلم المزيد",
    background: (
      <Calendar
        mode="single"
        selected={new Date(2022, 4, 11, 0, 0, 0)}
        className="absolute right-0 top-10 origin-top rounded-md border transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] group-hover:scale-105"
      />
    ),
  },
];
export function BentoDemo() {
  return (
    <BentoGrid>
      {features.map((feature, idx) => (
        <BentoCard key={idx} {...feature} />
      ))}
    </BentoGrid>
  );
}
