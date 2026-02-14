type Props = {
    name: string;
    onClose: () => void;
    onConfirm: () => void;
};

export default function DeleteConfirmation({ name, onClose, onConfirm }: Props) {
    return (
        <div className="fixed inset-0 bg-black/50  flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full">
              <h2 className="text-lg font-semibold mb-4">Are you sure?</h2>
              <p className="mb-4">You are about to permanently delete "{name}" from the database.</p>
              <p className="mb-6 text-red-600 font-medium">This action cannot be undone!</p>
              <div className="flex justify-end">
                <button
                  onClick={onClose}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-lg mr-2 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    onConfirm();
                    onClose();
                  }}
                  className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
        </div>
    )
}