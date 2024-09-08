import { AiOutlineLock } from "react-icons/ai";
import { IoInfinite } from "react-icons/io5";

export default function AdvantageCards() {
  return (
    <div className="mt-16 flex w-full flex-col space-y-4 p-8 text-base-content *:rounded-xl *:bg-base-300 *:p-4 sm:flex-row sm:items-center sm:justify-between sm:space-x-4 sm:space-y-0 sm:*:h-52 sm:*:w-1/3 sm:*:max-w-64">
      <div className="flex flex-col items-center justify-start space-y-4">
        <AiOutlineLock className="size-10" />
        <h1 className="font-bold">Privacy</h1>
        <p>
          All conversions take place in your browser so no one has access to
          your files
        </p>
      </div>
      <div className="flex h-full flex-col items-center justify-start space-y-4">
        <IoInfinite className="size-10" />
        <h1 className="font-bold">No Limits</h1>
        <p>Convert as much as you want for free without limitations</p>
      </div>
      <div className="flex h-full flex-col items-center justify-start space-y-4">
        <AiOutlineLock className="size-10" />
        <h1 className="font-bold">Privacy</h1>
        <p>All files are processd localy</p>
      </div>
    </div>
  );
}
