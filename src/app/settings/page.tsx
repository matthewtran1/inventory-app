const Settings = () => {
  return (
    <div className="h-full p-8">
      <div className="mx-auto">
        {/* Page Header */}
        

        {/* Profile Section */}
        <div className="bg-white border rounded-lg p-6 mb-6">
        <h1 className="text-2xl font-semibold mb-6">Settings</h1>
          <h2 className="text-lg font-medium mb-4">Profile</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Display Name
              </label>
              <input
                type="text"
                placeholder="Your name"
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
              />
            </div>
          </div>
        </div>

        {/* Preferences Section */}
        <div className="bg-white border rounded-lg p-6 mb-6">
          <h2 className="text-lg font-medium mb-4">Preferences</h2>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">
              Enable notifications
            </span>
            <input type="checkbox" className="h-4 w-4" />
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-white border border-red-200 rounded-lg p-6">
          <h2 className="text-lg font-medium text-red-600 mb-2">
            Danger Zone
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            These actions are irreversible.
          </p>

          <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 cursor-pointer">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
