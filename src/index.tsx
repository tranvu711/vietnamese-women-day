import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, Music2, Gift, Share2, Printer, Settings, PartyPopper } from "lucide-react";
import "./index.css"; // Import Tailwind CSS

// Custom background component with animation
const AnimatedBackground = () => {
    return (
        <div className="background-animation fixed inset-0 overflow-hidden -z-10">
            <div
                className="circle absolute rounded-full bg-white/10"
                style={{
                    width: '150px',
                    height: '150px',
                    top: '10%',
                    left: '20%',
                    animation: 'float 6s infinite ease-in-out',
                }}
            />
            <div
                className="circle absolute rounded-full bg-white/10"
                style={{
                    width: '200px',
                    height: '200px',
                    bottom: '15%',
                    right: '25%',
                    animation: 'float 7s infinite ease-in-out',
                }}
            />
            <div
                className="circle absolute rounded-full bg-white/10"
                style={{
                    width: '100px',
                    height: '100px',
                    top: '50%',
                    left: '70%',
                    animation: 'float 8s infinite ease-in-out',
                }}
            />
            <style jsx>{`
                @keyframes float {
                    0% { transform: translateY(0px); }
                    50% { transform: translateY(-20px); }
                    100% { transform: translateY(0px); }
                }
            `}</style>
        </div>
    );
};

// 20/10 — Vietnamese Women's Day celebratory single-file component (no countdown)
// Tech: TailwindCSS + Framer Motion + lucide-react — no backend
// Quick customize: change DEFAULTS below or use the in-page Settings (gear icon)

const THEME_MAP = {
    rose: {
        bgFrom: "from-rose-50",
        bgTo: "to-rose-100",
        text: "text-rose-900",
        accent: "text-rose-600",
        chip: "bg-rose-100 text-rose-700",
        btn: "bg-rose-600 hover:bg-rose-700 text-white",
        glow: "shadow-[0_0_80px_-10px_rgba(244,63,94,0.45)]",
    },
    fuchsia: {
        bgFrom: "from-fuchsia-50",
        bgTo: "to-fuchsia-100",
        text: "text-fuchsia-900",
        accent: "text-fuchsia-600",
        chip: "bg-fuchsia-100 text-fuchsia-700",
        btn: "bg-fuchsia-600 hover:bg-fuchsia-700 text-white",
        glow: "shadow-[0_0_80px_-10px_rgba(217,70,239,0.45)]",
    },
    purple: {
        bgFrom: "from-purple-50",
        bgTo: "to-purple-100",
        text: "text-purple-900",
        accent: "text-purple-600",
        chip: "bg-purple-100 text-purple-700",
        btn: "bg-purple-600 hover:bg-purple-700 text-white",
        glow: "shadow-[0_0_80px_-10px_rgba(147,51,234,0.45)]",
    },
    pink: {
        bgFrom: "from-pink-50",
        bgTo: "to-pink-100",
        text: "text-pink-900",
        accent: "text-pink-600",
        chip: "bg-pink-100 text-pink-700",
        btn: "bg-pink-600 hover:bg-pink-700 text-white",
        glow: "shadow-[0_0_80px_-10px_rgba(236,72,153,0.45)]",
    },
    orange: {
        bgFrom: "from-orange-50",
        bgTo: "to-orange-100",
        text: "text-orange-900",
        accent: "text-orange-600",
        chip: "bg-orange-100 text-orange-700",
        btn: "bg-orange-600 hover:bg-orange-700 text-white",
        glow: "shadow-[0_0_80px_-10px_rgba(234,88,12,0.45)]",
    },
};

type ThemeKey = keyof typeof THEME_MAP;

const DEFAULTS = {
    title: "Chúc mừng 20/10",
    recipient: "Chị Em Phụ Nữ Việt Nam",
    sender: "From Teko-ers With 💙",
    mainMessage: `Gửi những đồng nghiệp nữ đáng mến,
        
Ngày 20 tháng 10 lại đến – dịp để chúng ta trân trọng và tôn vinh những người phụ nữ tuyệt vời quanh mình.
Cảm ơn chị em Teko đã luôn mạnh mẽ, dịu dàng và lan tỏa nguồn năng lượng tích cực mỗi ngày, khiến nơi làm việc trở nên ấm áp và đầy cảm hứng.
Chúc các chị em luôn xinh đẹp, tự tin, hạnh phúc và tự hào về chính mình – vì chỉ cần như vậy thôi, thế giới này đã tươi đẹp hơn rất nhiều.

From Teko-ers with love!
`,
    theme: "rose" as ThemeKey,
    accentEmojis: ["🌸", "💐", "✨", "💖", "🎉"],
    musicUrl: "https://tranvu.info/20.10/Em-Trong-Mat-Toi-Anh-Khang.mp3",
    galleries: [{
        image: "https://tranvu.info/20.10/oanh.ttk.jpg",
        sender: "minh.nd@teko.vn",
        wish: `Chị như cây lớn giữa rừng xanh
                Em như mầm mới ngước lên học hoài
                Carbon chị đếm chẳng sai
                Em lo bug lỗi, fix hoài không xong
                
                Hai mươi tháng mười rộn ràng
                Em xin gửi chúc dịu dàng thương yêu
                Chúc chị khỏe mạnh thật nhiều
                Dẫn đường sản phẩm bay vèo lên mây`,
    }, {
        image: "https://tranvu.info/20.10/an.ntt.jpg",
        sender: "thuc.tm1@teko.vn",
        wish: `Chúc chị 20/10 mãi luôn xinh đẹp và tràn đầy niềm vui bên tổ ấm nhỏ của mình. 💐
                Hi vọng mỗi ngày đến công ty sẽ luôn nhìn thấy nụ cười tươi rạng rỡ của chị, vì chị cười rất xinh đẹp ạ.
                Chúc chị luôn hạnh phúc, thành công trong công việc, được mọi người yêu thương và gặp thật nhiều may mắn trong cuộc sống. Mong rằng niềm vui và năng lượng tích cực của chị sẽ lan tỏa đến tất cả mọi người xung quanh! 🌸💖`,
    }, {
        image: "https://tranvu.info/20.10/thuan.nt.jpg?",
        sender: "huu.dm@teko.vn",
        wish: `Sáng nào chị đến thật tươi,
                Quét đi mệt mỏi, nụ cười trên môi.
                Bánh thơm, nước mát đủ mồi,
                Chị lo chu đáo, chẳng lôi ai phiền.
                
                Văn phòng nhờ chị an yên,
                Ghế bàn sáng bóng, kẹo viên thơm lừng.
                Chúc chị luôn đẹp, dễ ưng,
                Tươi như nắng sớm, vui chừng quanh năm! 🌸`,
    }, {
        image: "https://tranvu.info/20.10/linh.ht.jpg",
        sender: "hieu.nm1@teko.vn",
        wish: `Mùa xuân phải có hoa đào gặp nhau phải có lời chào đầu tiên. Vâng lại là em đây, trời xui đất khiến kiểu gì vẫn là em, thôi thì mình cũng quê a Thành là không lòng vòng, sắp tới nhân ngày 20 tháng thập chúc chị có thật nhiều niềm vui, thật nhiều tiền (này quan trọng) cố gắng đạt được target work life balance và đảm bảo sức khỏe luôn ở trạng thái đỉnh cao phong độ (bớt chấm muối lại hộ tui)`,
    }, {
        image: "https://tranvu.info/20.10/thao.ttt.jpg",
        sender: "tri.ndm@teko.vn",
        wish:  `Bug còn đó nhưng hôm nay chưa sửa,
                Deadline xa tạm gác lại vài giờ.
                Chúc Thảo 20/10 rạng ngời tỏa sáng,
                Dẫn team vươn xa, OKR về đích.`,
    }, {
        image: "https://tranvu.info/20.10/dung.dn.jpg?1",
        sender: "dang.nn1@teko.vn",
        wish: "Nhân dịp 20/10, chúc cho bạn Dung năm nay sẽ luôn cute :> thành công và luôn tin tưởng vào bản thân trong công việc, quan trọng là lun thư giãn, iu đời nhóooo :>",
    }, {
        image: "https://tranvu.info/20.10/vy.ttk.jpg",
        sender: "bach.tg@teko.vn",
        wish: `Hé lô chị Khánh Vy aka Vy Vu, là em đây, Happy 20/10 🌹!! Chúc chị Vy không chỉ hôm nay mà cả những ngày sau luôn ngập tràn hạnh phúc, niềm vui và thuận lợi trong công việc, cuộc sống. Cảm ơn chị vì sự tận tâm và luôn mang đến năng lượng tích cực cho văn phòng HCM. Chúc chị HR mãi giữ tinh thần "vi vu", vui vẻ và tràn đầy năng lượng mỗi ngàyyyy 🤞🤞🤞.`,
    }, {
        image: "https://tranvu.info/20.10/thuy.nb.jpg",
        sender: "dung.nt1@teko.vn",
        wish: `Chúc chị Thuỳ xinh đẹp, dễ thương,
                Nụ cười tỏa nắng, dịu dàng vấn vương. 🌸
                Khách vui, team quý – chị luôn tỏa sáng,
                ERP nhờ chị mà thêm yêu thương! 💐
                
                - Hội thơ Tao Đàn -`,
    }, {
        image: "https://tranvu.info/20.10/tien.ntc.jpg",
        sender: "thin.nv@teko.vn",
        wish: `Ngày hai mươi tháng mười tới liền,
                Team rộn ràng gọi tên nàng Tiên.
                Code thì “mượt” như dòng suối nhỏ,
                Bug gặp Tiên cũng… chạy ra biên! 😆
                
                UI lung linh, ai xem cũng ghiền,
                Deploy phát một – client cười hiền.
                Chúc Tiên xinh đẹp, vui như thiếu niên,
                Mùa code bội thu, chẳng lo ưu phiền! 🌾`,
    }, {
        image: "https://tranvu.info/20.10/trang.ptt.jpg",
        sender: "dat.np@teko.vn",
        wish: `Chúc em sức khỏe - vui vẻ - hạnh phúc.....           
                Hai mươi tháng mười hổng có quà,
                Gửi em vài chữ gọi là “qua loa”.
                Chúc em xinh đẹp như hoa,
                Nhưng bớt cà khịa kẻo người ta… mệt lòng.`,
    }, {
        image: "https://tranvu.info/20.10/chau.tnm.jpg",
        sender: "son.tvh@teko.vn",
        wish: `Hôm nay mạng lưới Cardano,
                Block chưa kịp sync… đã lo tặng quà.
                Commit code giữa chiều tà,
                Push lên gặp bug – vẫn là… nữ nhi 😆.
                
                Loyalty xưa vẫn còn ghi,
                Châu từng “gánh team” chẳng khi nào phai.
                Smart contract viết rất hay,
                Logic chuẩn chỉnh, dev trai phải nể! 💻
                
                Ngày Phụ nữ – chúc Châu mê,
                Vừa xinh, vừa giỏi, cà phê mỗi chiều.
                Đời như blockchain diệu kỳ,
                Không fork, không lỗi – chỉ vui và chill! 🌸`,
    }, {
        image: "https://tranvu.info/20.10/nguyen.ndt.jpg?",
        sender: "dong.cb@teko.vn",
        wish: `Nhân ngày 20/10, chúc chị Nguyên luôn xinh đẹp, tự tin và thành công cuộc sống
                Cảm ơn chị vì luôn mang lại “giao diện” tươi sáng không chỉ cho sản phẩm mà còn cho cả team`,
    }],
};

// Simple falling petals / confetti without external libs
function usePetals(emojis: string[], count = 22) {
    const [petals, setPetals] = useState<{
        id: number; x: number; size: number; rot: number; emoji: string; delay: number; duration: number;
    }[]>([]);
    useEffect(() => {
        const p = Array.from({ length: count }).map((_, i) => ({
            id: i,
            x: Math.random() * 100, // vw
            size: 18 + Math.random() * 20,
            rot: (Math.random() - 0.5) * 60,
            emoji: emojis[Math.floor(Math.random() * emojis.length)],
            delay: Math.random() * 6,
            duration: 8 + Math.random() * 8,
        }));
        setPetals(p);
    }, [emojis, count]);
    return petals;
}

function Ribbon({ text }: { text: string }) {
    return (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
            <div className="px-4 py-1 rounded-full bg-white shadow text-xs font-medium flex items-center gap-1">
                <PartyPopper className="w-4 h-4" /> <span>{text}</span>
            </div>
        </div>
    );
}

// Fancy shimmering title with animated gradient glow
function FancyTitle({ text, accentClass }: { text: string; accentClass: string }) {
    return (
        <div className="relative inline-block">
            {/* Aurora glow */}
            <div
                className="absolute -inset-6 blur-2xl opacity-70 pointer-events-none"
                style={{ background: "radial-gradient(60% 60% at 50% 40%, rgba(255,255,255,0.9), rgba(255,255,255,0.0))" }}
            />
            <h1
                className={`text-4xl md:text-6xl font-black tracking-tight leading-tight ${accentClass} [text-shadow:0_2px_20px_rgba(255,255,255,0.6)]`}
                style={{
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                    backgroundImage:
                        "linear-gradient(90deg, rgba(255,255,255,0.9), rgba(255,255,255,0.7), rgba(255,255,255,0.95))",
                    backgroundSize: "200% 100%",
                    animation: "shimmer 3s linear infinite",
                }}
            >
                {text}
            </h1>
            <style>{`@keyframes shimmer{0%{background-position:0% 50%}100%{background-position:200% 50%}}`}</style>
            {/* Sparkle dots */}
            <div className="absolute -top-3 -right-3 w-2 h-2 rounded-full bg-white animate-ping" />
            <div className="absolute -bottom-2 -left-2 w-1.5 h-1.5 rounded-full bg-white/90 animate-pulse" />
        </div>
    );
}

// Animated wish card styled as a realistic paper letter with gold frame background
function AnimatedWish({ text, sender }: { text: string; sender: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative group mt-8 mb-6 max-w-3xl mx-auto letter-wrapper"
        >

            {/* Main paper letter with 3D effects and gold frame background */}
            <div
                className="relative rounded-lg overflow-hidden"
                style={{
                    backgroundImage: "url('./blank-rectangle-gold-frame-pink-background-template-vector.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat"
                }}
            >


                <div className="letter-content">
                    {/* Letter heading */}
                    <h3 className="letter-header">Happy Vietnamese Women's Day</h3>

                    {/* Letter body text with animated reveal - Using Vietnamese friendly font */}

                    <motion.div
                        className="vietnamese-text text-lg md:text-xl leading-relaxed mt-5 message-text-animation"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        <TypewriterWish text={text} />

                        {/*/!* Signature with flourish *!/*/}
                        {/*<motion.div*/}
                        {/*    className="letter-signature"*/}
                        {/*    initial={{ opacity: 0, scale: 0.95 }}*/}
                        {/*    animate={{ opacity: 1, scale: 1 }}*/}
                        {/*    transition={{ delay: text.length * 0.015 + 1 }}*/}
                        {/*>*/}
                        {/*    <div className="relative">*/}
                        {/*        {sender}*/}
                        {/*        <svg className="absolute -bottom-3 left-0 w-full h-3 opacity-30" viewBox="0 0 100 10" xmlns="http://www.w3.org/2000/svg">*/}
                        {/*            <path d="M0,5 Q25,0 50,5 T100,5" fill="none" stroke="#d24f79" strokeWidth="1"></path>*/}
                        {/*        </svg>*/}
                        {/*    </div>*/}
                        {/*</motion.div>*/}
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}

// Ethereal animated aurora + glass bubbles background
function EtherealBackdrop() {
    return (
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
            {/* Aurora gradients */}
            <div className="absolute -top-32 -left-32 w-[60vw] h-[60vw] rounded-full blur-3xl opacity-50 bg-gradient-to-tr from-white/40 via-white/20 to-white/10 animate-[float_18s_ease-in-out_infinite]" />
            <div className="absolute -bottom-40 -right-40 w-[55vw] h-[55vw] rounded-full blur-3xl opacity-50 bg-gradient-to-tr from-white/30 via-white/15 to-white/5 animate-[float_22s_ease-in-out_infinite_reverse]" />
            {/* Glass bubbles */}
            {[...Array(6)].map((_, i) => (
                <div
                    key={i}
                    className="absolute rounded-full backdrop-blur-xl border border-white/30 bg-white/10 shadow-md"
                    style={{
                        width: `${80 + i * 16}px`,
                        height: `${80 + i * 16}px`,
                        left: `${10 + i * 12}%`,
                        top: `${15 + (i % 3) * 20}%`,
                        animation: `drift ${14 + i * 2}s ease-in-out ${i}s infinite alternate`,
                    }}
                />
            ))}
            <style>{`
        @keyframes float{0%{transform:translateY(0)}50%{transform:translateY(-12px)}100%{transform:translateY(0)}}
        @keyframes drift{0%{transform:translate(0,0) rotate(0)}100%{transform:translate(20px,-20px) rotate(8deg)}}
      `}</style>
        </div>
    );
}

// lightweight copy of spanClass for tests (pure)
function spanClassTest(i:number){ return [0,4,7,10].includes(i); }

// Typewriter wish that reveals text char-by-char (popup panel)
function TypewriterWish({ text, sender }: { text: string, sender: string }) {
    const [typed, setTyped] = React.useState("");
    const [done, setDone] = React.useState(false);
    React.useEffect(() => {
        setTyped(""); setDone(false);
        let i = 0;
        const speed = 28; // ms per char
        const id = setInterval(() => {
            i++; const next = text.slice(0, i);
            setTyped(next);
            if (i >= text.length) { clearInterval(id); setDone(true); }
        }, speed);
        return () => clearInterval(id);
    }, [text]);
    return (
        <div
            className="mt-4 text-base md:text-lg leading-relaxed text-gray-800"
            style={{ whiteSpace: "pre-line", textAlign: "left" }}
        >
            {typed}
            {!done && <span className="border-r-2 border-pink-400 ml-0.5 animate-pulse" />}
            {done && sender && (
                <div className="mt-4 text-sm text-gray-500">— {sender}</div>
            )}
        </div>
    );
}

export default function WomensDay20_10() {
    const [data, setData] = useState(DEFAULTS);
    const theme = THEME_MAP[data.theme as ThemeKey] ?? THEME_MAP.rose;
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [playing, setPlaying] = useState(false);
    const [openSettings, setOpenSettings] = useState(false);
    const [showWish, setShowWish] = useState(true);
    const [currentSlide, setCurrentSlide] = useState(0); // Track current slide

    const petals = usePetals(data.accentEmojis, 22);

    // Observe gallery in-view to morph header style
    const galleryRef = useRef<HTMLDivElement | null>(null);
    const mainRef = useRef<HTMLDivElement | null>(null);
    const [inGallery, setInGallery] = useState(false);
    const [galleries, setGalleries] = useState(data.galleries);

    useEffect(() => {
        const obs = new IntersectionObserver(([entry]) => setInGallery(!!entry?.isIntersecting), { threshold: 0.55 });
        if (galleryRef.current) obs.observe(galleryRef.current);
        return () => obs.disconnect();
    }, []);

    useEffect(() => {
        setGalleries([...data.galleries].sort(() => Math.random() - 0.5));
    }, []);

    // Scroll to specific slide
    const scrollToSlide = (slideIndex: number) => {
        setCurrentSlide(slideIndex);
        if (slideIndex === 0 && mainRef.current) {
            mainRef.current.scrollIntoView({ behavior: 'smooth' });
        } else if (slideIndex === 1 && galleryRef.current) {
            galleryRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // POPUP STATE (reusing names)
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);
    const openLightbox = (i: number) => { setLightboxIndex(i); setLightboxOpen(true); };
    const closeLightbox = () => setLightboxOpen(false);
    const nextLightbox = () => setLightboxIndex((i) => (i + 1) % data.gallery.length);
    const prevLightbox = () => setLightboxIndex((i) => (i - 1 + data.gallery.length) % data.gallery.length);

    // Keyboard controls for popup (optional arrows)
    useEffect(() => {
        if (!lightboxOpen) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') closeLightbox();
            else if (e.key === 'ArrowRight') nextLightbox();
            else if (e.key === 'ArrowLeft') prevLightbox();
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [lightboxOpen]);


    useEffect(() => {
        if (!audioRef.current) return;
        playing ? audioRef.current.play().catch(() => {}) : audioRef.current.pause();
    }, [playing]);

    const share = async () => {
        const text = `${data.title} — ${data.recipient}\n${data.mainMessage}\n${data.sender}`;
        const url = typeof window !== "undefined" ? window.location.href : "";
        if ((navigator as any).share) {
            try {
                await (navigator as any).share({ title: data.title, text, url });
            } catch {}
        } else {
            navigator.clipboard?.writeText(`${text}\n${url}`);
            alert("Đã copy lời chúc & link vào clipboard!");
        }
    };

    return (
        <div id="top" className={`min-h-screen bg-gradient-to-b ${theme.bgFrom} ${theme.bgTo} relative overflow-hidden`}>
            <EtherealBackdrop />
            <AnimatedBackground />

            {/* Floating petals */}
            <div className="pointer-events-none absolute inset-0">
                {petals.map((p) => (
                    <motion.div
                        key={p.id}
                        initial={{ y: -60, rotate: p.rot }}
                        animate={{ y: "110vh", rotate: p.rot + 120 }}
                        transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
                        style={{ left: `${p.x}vw`, fontSize: p.size }}
                        className="absolute opacity-70"
                    >
                        {p.emoji}
                    </motion.div>
                ))}
            </div>

            {/* Fixed Header */}
            <header className={`top-0 left-0 right-0 z-30 transition-colors duration-500`}>
                <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
                    <div className={`flex items-center gap-2 ${inGallery ? "text-white mix-blend-difference" : theme.text}`}>
                        <Sparkles className="w-6 h-6" />
                        <span className="font-semibold tracking-wide">Vietnamese Women's Day - 20/10</span>
                    </div>
                    <div className="flex items-center gap-2">
                        {/* Navigation dots */}
                        <div className="hidden md:flex items-center gap-3 mr-4">
                            <button
                                onClick={() => scrollToSlide(0)}
                                className={`h-2.5 w-2.5 rounded-full transition-all ${currentSlide === 0 ? `${theme.accent} scale-125` : 'bg-gray-300 hover:bg-gray-400'}`}
                                aria-label="Go to greeting section"
                            />
                            <button
                                onClick={() => scrollToSlide(1)}
                                className={`h-2.5 w-2.5 rounded-full transition-all ${currentSlide === 1 ? `${theme.accent} scale-125` : 'bg-gray-300 hover:bg-gray-400'}`}
                                aria-label="Go to gallery section"
                            />
                        </div>
                        <button onClick={() => setPlaying((p) => !p)} className={`rounded-xl px-3 py-2 text-sm shadow ${inGallery ? "bg-white/20 text-white hover:bg-white/30" : theme.chip} hover:opacity-90 flex items-center gap-2`}>
                            <Music2 className={`w-4 h-4 ${playing ? "animate-pulse" : ""}`} /> {playing ? "Tắt nhạc" : "Phát nhạc"}
                        </button>
                    </div>
                </div>
            </header>

            {/* Scroll navigation arrows */}
            <div className="fixed bottom-8 right-8 z-30 flex flex-col gap-4">
                {currentSlide > 0 && (
                    <button
                        onClick={() => scrollToSlide(currentSlide - 1)}
                        className={`p-3 rounded-full shadow-lg ${theme.btn} hover:scale-110 transition-transform`}
                        aria-label="Previous section"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                        </svg>
                    </button>
                )}
                {currentSlide < 1 && (
                    <button
                        onClick={() => scrollToSlide(currentSlide + 1)}
                        className={`p-3 rounded-full shadow-lg ${theme.btn} hover:scale-110 transition-transform animate-bounce`}
                        aria-label="Next section"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                    </button>
                )}
            </div>

            {/* Hero / Wish Section - Full Screen */}
            <main ref={mainRef} className="relative z-10 min-h-screen flex items-center justify-center snap-start snap-always" id="greeting-section">
                <div className="w-full max-w-5xl mx-auto px-4" >
                    <section className={`mt-6 md:mt-0 p-6 md:p-10 rounded-3xl  ${theme.glow}`}
                             style={{
                                 backgroundImage: "url('https://tranvu.info/20.10/bg04.jpg?')",
                                 backgroundSize: "cover",
                                 backgroundPosition: "center",
                                 backgroundRepeat: "no-repeat",
                                 backgroundColor: "rgba(255, 255, 255, 0.6)",
                             }}
                    >
                        <div className="relative">
                            {/*<Ribbon text="Happy Vietnamese Women's Day" />*/}
                            <div className="flex flex-col items-center text-center">
                                {showWish && <AnimatedWish text={data.mainMessage} />}
                            </div>
                        </div>
                    </section>
                </div>
            </main>

            {/* Enhanced Transparent Gallery - Full Screen */}
            <section id="gallery" ref={galleryRef} className="relative min-h-screen w-full py-16 overflow-hidden flex items-center justify-center snap-start snap-always">
                {/* Advanced Background with Prismatic Effects - Completely redesigned */}
                <div className="absolute inset-0">
                    {/* Animated floating circles */}
                    <div className={`absolute top-20 left-10 w-60 h-60 rounded-full ${theme.bgFrom} opacity-20 blur-3xl`}
                         style={{animation: 'float 25s ease-in-out infinite'}}></div>
                    <div className={`absolute bottom-20 right-10 w-80 h-80 rounded-full ${theme.bgTo} opacity-20 blur-3xl`}
                         style={{animation: 'float 30s ease-in-out infinite reverse'}}></div>

                    {/* Decorative elements - transparent geometric shapes */}
                    <div className="absolute top-1/4 left-1/3 w-32 h-32 border border-white/20 rounded-full rotate-45 backdrop-blur-sm"
                         style={{animation: 'spin-slow-reverse 15s linear infinite'}}></div>
                    <div className="absolute bottom-1/4 right-1/3 w-40 h-40 border border-white/30 rounded-full backdrop-blur-sm"
                         style={{animation: 'spin-slow 20s linear infinite'}}></div>

                    {/* Light beam effects */}
                    <div className="absolute inset-0 opacity-30"
                         style={{
                             background: 'radial-gradient(circle at 30% 20%, rgba(255,255,255,0.8), rgba(255,255,255,0) 50%), ' +
                                 'radial-gradient(circle at 70% 60%, rgba(255,255,255,0.6), rgba(255,255,255,0) 50%)'
                         }}></div>

                    {/* Animated gradient overlay */}
                    <div className="absolute inset-0 opacity-20"
                         style={{
                             backgroundImage: 'linear-gradient(120deg, transparent, rgba(255,255,255,0.5), transparent)',
                             backgroundSize: '200% 200%',
                             animation: 'gradient-shift 8s ease-in-out infinite alternate'
                         }}></div>

                    {/* Light dots pattern */}
                    <div className="absolute inset-0 opacity-20"
                         style={{
                             backgroundImage: 'radial-gradient(circle at 20px 20px, rgba(255,255,255,0.8) 2px, transparent 2px)',
                             backgroundSize: '40px 40px'
                         }}></div>

                    {/* Subtle mesh grid */}
                    <div className="absolute inset-0 opacity-10"
                         style={{
                             backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)',
                             backgroundSize: '40px 40px'
                         }}></div>

                    {/* Central light effect with animation */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] opacity-30"
                         style={{
                             background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)',
                             animation: 'pulse-slow 10s infinite'
                         }}></div>
                </div>

                <div className="relative z-10 w-full max-w-7xl mx-auto px-4 flex flex-col items-center">
                    {/* Header section with enhanced animation */}
                    <motion.div
                        className="mb-10 flex flex-col items-center text-center"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                    >
                        <h2 className="text-2xl md:text-5xl font-black text-gray-800 drop-shadow-sm tracking-tight relative inline-block">
                            Gửi lời đến <span className={`${theme.accent}`}>chị em</span>
                            <span className="absolute -top-3 -right-6 text-2xl animate-pulse">
                                {data.accentEmojis[0]}
                            </span>
                        </h2>
                        <div className={`w-20 h-1 mt-3 ${theme.accent} rounded-full opacity-80`}></div>
                    </motion.div>

                    {/* Enhanced Transparent Gallery with CSS3 Effects */}
                    <div className="relative w-full aspect-square max-w-[700px] mx-auto">
                        {/* Improved Glass Morphism Center Logo */}
                        <div className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 z-20
                                         w-[120px] h-[120px] md:w-[160px] md:h-[160px] rounded-full
                                         flex items-center justify-center
                                         overflow-hidden">
                            {/* Enhanced decorative elements with animation */}
                            <div className="absolute -inset-1 rounded-full blur-md opacity-70 border-1 border-white/30 animate-pulse-slow"
                                 style={{
                                     // background: "#232d39"
                                     background:"blue"
                                 }}
                            ></div>
                            <img className={"absolute"} src={"https://career.teko.vn/images/Teko-Logo-solution-light.png"}/>

                        </div>

                        {/* Enhanced transparent orbits with animation */}
                        <div className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2
                                         w-[60%] h-[60%] rounded-full border border-white/30 overflow-visible
                                         backdrop-blur-[1px] opacity-70 animate-spin-slow">
                            {/* Decorative dots along the orbit */}
                            {[...Array(12)].map((_, i) => {
                                const angle = i * (Math.PI * 2 / 12);
                                const x = Math.cos(angle) * 50;
                                const y = Math.sin(angle) * 50;
                                return (
                                    <div key={i}
                                         className="absolute h-1 w-1 rounded-full bg-white/80"
                                         style={{
                                             left: `calc(50% + ${x}%)`,
                                             top: `calc(50% + ${y}%)`,
                                             boxShadow: '0 0 5px 1px rgba(255, 255, 255, 0.4)'
                                         }}
                                    ></div>
                                );
                            })}
                        </div>

                        {/* Second orbit with enhanced animation */}
                        <div className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2
                                         w-[65%] h-[65%] rounded-full border border-white/20
                                         opacity-50 animate-[spin_15s_linear_infinite_reverse]">
                            {/* Enhanced linear gradient track */}
                            <div className="absolute inset-0 rounded-full border-2 border-transparent"
                                 style={{
                                     backgroundImage: 'linear-gradient(90deg, transparent, white, transparent, white, transparent)',
                                     backgroundSize: '200% 100%',
                                     animation: 'shimmer 8s linear infinite',
                                     backgroundClip: 'border-box',
                                     WebkitBackgroundClip: 'border-box',
                                     transform: 'rotate(45deg)'
                                 }}>
                            </div>
                        </div>

                        {/* Enhanced photo gallery with transparent effects */}
                        {galleries.map((item, i) => {
                            let src = item.image;
                            // Calculate positions in a circle with proper geometry
                            const angle = (i * (2 * Math.PI / galleries.length));
                            const radius = 42; // % of container
                            const x = 42 + radius * Math.cos(angle);
                            const y = 42 + radius * Math.sin(angle);

                            // Calculate control points for Bezier curves, ensuring they're concentric
                            const midRadius = 22; // Control point radius
                            const midAngle = angle + (Math.random() * 0.15 - 0.075); // Control point angle with slight randomness
                            const cpX = 50 + midRadius * Math.cos(midAngle);
                            const cpY = 50 + midRadius * Math.sin(midAngle);

                            return (
                                <motion.div
                                    key={i}
                                    className="absolute w-[20%] md:w-[17%] aspect-square rounded-full overflow-hidden z-10
                                               shadow-lg transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500"
                                    style={{
                                        top: `${y}%`,
                                        left: `${x}%`,
                                        filter: 'drop-shadow(0 10px 15px rgba(0, 0, 0, 0.1))',
                                    }}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{
                                        duration: 0.6,
                                        delay: i * 0.1 % 0.5,
                                    }}
                                    whileHover={{
                                        scale: 1.15,
                                        zIndex: 30,
                                        filter: 'drop-shadow(0 12px 20px rgba(0, 0, 0, 0.15))'
                                    }}
                                >
                                    {/* Enhanced decorative connect line with gradient */}
                                    <svg className="absolute"
                                         style={{
                                             width: '100vw',
                                             height: '100vh',
                                             top: '50%',
                                             left: '50%',
                                             transform: 'translate(-50%, -50%)',
                                             zIndex: -1,
                                             overflow: 'visible',
                                             position: 'absolute',
                                             pointerEvents: 'none'
                                         }}>
                                        <path
                                            d={`M ${x} ${y} Q ${cpX} ${cpY} 50 50`}
                                            fill="none"
                                            stroke={`url(#lineGradient${i})`}
                                            strokeWidth="1"
                                            strokeDasharray={i % 2 === 0 ? "0" : "4 2"}
                                            className="opacity-60"
                                            style={{
                                                filter: 'drop-shadow(0 0 2px rgba(255, 255, 255, 0.7))',
                                            }}
                                        />
                                        <defs>
                                            <linearGradient id={`lineGradient${i}`} x1="0%" y1="0%" x2="100%" y2="0%">
                                                <stop offset="0%" stopColor="rgba(255,255,255,0)" />
                                                <stop offset="50%" stopColor="white" />
                                                <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                                            </linearGradient>
                                        </defs>
                                    </svg>

                                    {/* Enhanced glass morphism container */}
                                    <div className="group relative w-full h-full cursor-pointer backdrop-blur-sm" onClick={() => openLightbox(i)}>
                                        {/* Enhanced glass border effect */}
                                        <div className="absolute inset-0 rounded-full border border-white/50
                                                      group-hover:border-white/80 transition-all z-10"></div>

                                        {/* Enhanced prismatic light effect */}
                                        <div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-white/10 opacity-0
                                                      group-hover:opacity-70 transition-all duration-300 rounded-full"></div>

                                        {/* Enhanced overlay with hover effect */}
                                        <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-90
                                                      bg-gradient-radial from-transparent to-black/70
                                                      flex items-center justify-center transition-all duration-300">
                                            {/* Enhanced play button animation */}
                                            <div className="p-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 shadow-lg
                                                          scale-0 group-hover:scale-100 transition-transform duration-300
                                                          flex items-center justify-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                                     className="w-4 h-4 text-white">
                                                    <path fillRule="evenodd"
                                                          d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                                                          clipRule="evenodd" />
                                                </svg>
                                            </div>
                                        </div>

                                        {/* Enhanced image with glass effect */}
                                        <div className="relative w-full h-full overflow-hidden rounded-full">
                                            {/* Enhanced overlay gradient */}
                                            <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent opacity-70 z-10"></div>

                                            {/* Enhanced image with blur effect */}
                                            <img
                                                src={src}
                                                alt={`Ảnh ${i + 1}`}
                                                className="w-full h-full object-cover filter blur-sm brightness-90
                                                       group-hover:blur-0 group-hover:brightness-100 transition-all duration-300"
                                                loading="lazy"
                                            />

                                            {/* Enhanced bottom gradient vignette */}
                                            <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black/20 to-transparent opacity-0
                                                         group-hover:opacity-80 transition-all duration-300"></div>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Bottom Navigation */}
                    <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                        <motion.div
                            className={`px-6 py-2 rounded-full ${theme.chip} backdrop-blur shadow flex items-center gap-2`}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 }}
                        >
                            <span className="text-lg">{data.accentEmojis[data.accentEmojis.length - 1]}</span>
                            <span className="font-medium">Nhấn vào ảnh để xem chi tiết</span>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Enhanced popup dialog with animation */}
            <AnimatePresence>
                {lightboxOpen && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* Enhanced background blur */}
                        <div
                            className="absolute inset-0 backdrop-blur-sm bg-black/40"
                            onClick={closeLightbox}
                        />

                        {/* Enhanced tooltip/chat style container */}
                        <motion.div
                            initial={{ scale: 0.8, y: 30, opacity: 0 }}
                            animate={{
                                scale: 1,
                                y: 0,
                                opacity: 1,
                                transition: {
                                    type: "spring",
                                    damping: 25,
                                    stiffness: 300,
                                    delay: 0.1
                                }
                            }}
                            exit={{ scale: 0.9, y: 20, opacity: 0 }}
                            className={`relative z-10 w-full max-w-5xl overflow-hidden`}
                        >
                            {/* Enhanced main tooltip/chat bubble */}
                            <div className={`relative rounded-3xl bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-xl 
                                           border border-white/70 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] overflow-hidden
                                           ${theme.glow}`}>

                                {/* Enhanced decorative elements */}
                                <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-white/50 to-transparent opacity-50"></div>
                                <div className="absolute -top-20 -left-20 w-40 h-40 rounded-full bg-gradient-to-br from-white/30 to-transparent blur-xl"></div>
                                <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-gradient-to-tl from-white/20 to-transparent blur-xl"></div>

                                {/* Close button */}
                                <button
                                    onClick={closeLightbox}
                                    className={`absolute top-4 right-4 p-2 rounded-full ${theme.btn} text-white z-10
                                              shadow-lg flex items-center justify-center transform transition-all duration-300
                                              hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50`}
                                    aria-label="Close"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>

                                {/* Image with quotes */}
                                <div className="p-6 pt-14 pb-8 md:p-8 md:pt-16 md:pb-10 flex flex-col md:flex-row gap-6 items-center">
                                    {/* Image container with enhanced glass effect */}
                                    <div className="relative w-full md:w-3/5 aspect-[4/3] rounded-2xl overflow-hidden group">
                                        {/* Prismatic border */}
                                        <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-pink-500/30 via-purple-500/30 to-cyan-500/30 opacity-70 group-hover:opacity-100 blur transition-opacity"></div>

                                        {/* Main image */}
                                        <div className="relative h-full rounded-2xl overflow-hidden border border-white/50 bg-white/20">
                                            <img src={galleries[lightboxIndex].image} alt="Enlarged view" className="w-full h-full object-cover" />

                                            {/* Enhanced prismatic highlight */}
                                            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-50"></div>
                                        </div>
                                    </div>

                                    {/* Message content */}
                                    <div className="w-full md:w-2/5 space-y-4 font-wish">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-2 h-2 rounded-full ${theme.accent}`}></div>
                                            {/*<div className={`text-sm font-semibold ${theme.accent}`}>20/10 Wishes</div>*/}
                                        </div>

                                        {/* Typewriter effect */}
                                        <TypewriterWish text={galleries[lightboxIndex].wish} sender={galleries[lightboxIndex].sender}/>

                                        {/* Image counter */}
                                        <div className="pt-2 text-xs text-gray-500 font-medium flex items-center gap-2">
                                            {/*<span>Ảnh {lightboxIndex + 1} / {data.gallery.length}</span>*/}
                                            {/*<div className="flex-1 h-0.5 bg-gray-100 rounded"></div>*/}
                                            {/*<span>{data.accentEmojis[lightboxIndex % data.accentEmojis.length]}</span>*/}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Audio player (hidden) */}
            {data.musicUrl && <audio ref={audioRef} src={data.musicUrl} loop />}

            {/* Add scroll snapping and full-page section styles */}
            <style jsx="true">{`
                html {
                    scroll-snap-type: y mandatory;
                    scroll-behavior: smooth;
                }

                @keyframes pulse-slow {
                    0%, 100% { opacity: 0.4; }
                    50% { opacity: 0.7; }
                }

                @keyframes float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-12px); }
                }

                @keyframes spin-slow {
                    from { transform: translate(-50%, -50%) rotate(0deg); }
                    to { transform: translate(-50%, -50%) rotate(360deg); }
                }

                @keyframes spin-slow-reverse {
                    from { transform: translate(-50%, -50%) rotate(0deg); }
                    to { transform: translate(-50%, -50%) rotate(-360deg); }
                }

                @keyframes shimmer {
                    0% { background-position: 0% 50%; }
                    100% { background-position: 200% 50%; }
                }

                @keyframes gradient-shift {
                    0% { background-position: 0% 0%; }
                    100% { background-position: 100% 100%; }
                }

                .animate-pulse-slow {
                    animation: pulse-slow 3s infinite;
                }

                .bg-gradient-radial {
                    background-image: radial-gradient(var(--tw-gradient-stops));
                }

                .snap-start {
                    scroll-snap-align: start;
                }

                .snap-always {
                    scroll-snap-stop: always;
                }
            `}</style>
        </div>
    );
}

// Mount the app
if (typeof document !== "undefined") {
    const root = createRoot(document.getElementById("root")!);
    root.render(<WomensDay20_10 />);
}
