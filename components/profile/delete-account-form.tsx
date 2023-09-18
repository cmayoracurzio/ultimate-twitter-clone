export default function AccountForm({
  currentUserProfile,
}: {
  currentUserProfile: Profile;
}) {
  return (
    <form className="w-full flex flex-col gap-2">
      {/* Confirm username input */}
      <div className="flex items-center gap-2 rounded-full px-5 py-2 ring-1 ring-inset ring-gray-600 focus-within:ring-primary">
        <input
          type="text"
          className="outline-none bg-transparent w-full text-white placeholder:text-gray-400 peer order-last"
        />
        <label
          htmlFor="username"
          className="w-56 text-sm text-gray-600 peer-focus-within:text-primary"
        >
          Confirm username:
        </label>
      </div>

      {/* Form submit button */}
      <button
        type="submit"
        className="w-full text-center rounded-full bg-red-500 px-5 py-2 font-semibold text-white hover:bg-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
        onClick={() => console.log("You clicked the delete account button!")}
      >
        Delete account
      </button>
    </form>
  );
}
