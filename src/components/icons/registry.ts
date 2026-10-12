import AudioLines from "lucide-react-native/icons/audio-lines";
import ArrowUp from "lucide-react-native/icons/arrow-up";
import Bell from "lucide-react-native/icons/bell";
import Book from "lucide-react-native/icons/book";
import Bookmark from "lucide-react-native/icons/bookmark";
import Briefcase from "lucide-react-native/icons/briefcase";
import Calendar from "lucide-react-native/icons/calendar";
import Check from "lucide-react-native/icons/check";
import ChevronLeft from "lucide-react-native/icons/chevron-left";
import ChevronRight from "lucide-react-native/icons/chevron-right";
import CircleCheck from "lucide-react-native/icons/circle-check";
import Clock from "lucide-react-native/icons/clock";
import FileText from "lucide-react-native/icons/file-text";
import GraduationCap from "lucide-react-native/icons/graduation-cap";
import Headphones from "lucide-react-native/icons/headphones";
import House from "lucide-react-native/icons/house";
import Lightbulb from "lucide-react-native/icons/lightbulb";
import LogOut from "lucide-react-native/icons/log-out";
import Mail from "lucide-react-native/icons/mail";
import MessageSquare from "lucide-react-native/icons/message-square";
import Mic from "lucide-react-native/icons/mic";
import Paperclip from "lucide-react-native/icons/paperclip";
import Pause from "lucide-react-native/icons/pause";
import Play from "lucide-react-native/icons/play";
import Plus from "lucide-react-native/icons/plus";
import Search from "lucide-react-native/icons/search";
import Settings from "lucide-react-native/icons/settings";
import SlidersHorizontal from "lucide-react-native/icons/sliders-horizontal";
import Sparkles from "lucide-react-native/icons/sparkles";
import Upload from "lucide-react-native/icons/upload";
import User from "lucide-react-native/icons/user";
import Users from "lucide-react-native/icons/users";
import Volume2 from "lucide-react-native/icons/volume-2";
import X from "lucide-react-native/icons/x";

/**
 * Single place where icon names map to Lucide icons.
 *
 * Names follow the design mock (`Design/src/App.tsx`) so screens read the same
 * here as they do in the reference implementation.
 */
export const icons = {
  arrow: ChevronRight,
  arrowUp: ArrowUp,
  bell: Bell,
  book: Book,
  bookmark: Bookmark,
  briefcase: Briefcase,
  calendar: Calendar,
  check: Check,
  checkCircle: CircleCheck,
  chevron: ChevronLeft,
  clock: Clock,
  close: X,
  document: FileText,
  graduation: GraduationCap,
  headphones: Headphones,
  home: House,
  lightbulb: Lightbulb,
  logout: LogOut,
  mail: Mail,
  message: MessageSquare,
  microphone: Mic,
  paperclip: Paperclip,
  pause: Pause,
  play: Play,
  plus: Plus,
  search: Search,
  settings: Settings,
  sliders: SlidersHorizontal,
  sparkles: Sparkles,
  upload: Upload,
  user: User,
  users: Users,
  volume: Volume2,
  waveform: AudioLines,
} as const;

export type IconName = keyof typeof icons;
