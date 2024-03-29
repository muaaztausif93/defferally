'use client';
import React, { useState } from 'react';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
import {
  PlusCircleIcon,
  EllipsisVerticalIcon,
} from '@heroicons/react/24/outline';
export default function PartiesForm({
  onEdit,
  onAdd,
  onRemove,
}: {
  onEdit: () => void;
  onAdd: () => void;
  onRemove: () => void;
}) {
  const [editDropDown, setEditDropDown] = useState<boolean>(false);

  const handleEditDropDown = () => {
    setEditDropDown(!editDropDown);
  };

  return (
    <>
      <div className="h-[100vh] w-[60%] overflow-auto bg-gray-100 p-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="mb-6 text-2xl font-semibold">Parties</h2>
          </div>
          <div>
            <PlusCircleIcon
              className="h-8 w-8 cursor-pointer"
              onClick={onAdd}
            />
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-md font-semibold">Exchanger</span>
              </div>
              <div onClick={handleEditDropDown}>
                <EllipsisVerticalIcon className="h-6 w-6 cursor-pointer text-gray-500" />
                {editDropDown && (
                  <div className="absolute z-[40] ml-[-5.5rem] rounded-md bg-white py-2">
                    <p
                      className="flex cursor-pointer items-center px-4 font-semibold text-gray-700 hover:bg-gray-50"
                      onClick={onEdit}
                    >
                      {' '}
                      <PencilIcon className="mr-2 h-4 w-4" />
                      Edit
                    </p>
                    <p
                      className="flex cursor-pointer items-center px-4 font-semibold text-gray-700 hover:bg-gray-100"
                      onClick={onRemove}
                    >
                      <TrashIcon className="mr-2 h-4 w-4" /> Remove
                    </p>
                  </div>
                )}
              </div>
            </div>
            <p className="py-1 text-sm text-gray-600">Ivan Ryan</p>
            <p className="text-sm text-gray-600">k_pacheco@gmail.com</p>
            <p className="py-1 text-sm text-gray-600">{`(401) 706-3344`}</p>
            <hr className="my-4 border-t border-gray-300" />
          </div>
          <div>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-md font-semibold">Exchanger</span>
              </div>
              <div>
                <svg
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="gray"
                  className="h-6 w-6 cursor-pointer"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                  />
                </svg>
              </div>
            </div>
            <p className="py-1 text-sm text-gray-600">Ivan Ryan</p>
            <p className="text-sm text-gray-600">k_pacheco@gmail.com</p>
            <p className="py-1 text-sm text-gray-600">{`(401) 706-3344`}</p>
            <hr className="my-4 border-t border-gray-300" />
          </div>
          <div>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-md font-semibold">Exchanger</span>
              </div>
              <div>
                <svg
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="gray"
                  className="h-6 w-6 cursor-pointer"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                  />
                </svg>
              </div>
            </div>
            <p className="py-1 text-sm text-gray-600">Ivan Ryan</p>
            <p className="text-sm text-gray-600">k_pacheco@gmail.com</p>
            <p className="py-1 text-sm text-gray-600">{`(401) 706-3344`}</p>
            <hr className="my-4 border-t border-gray-300" />
          </div>
          <div>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-md font-semibold">Exchanger</span>
              </div>
              <div>
                <svg
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="gray"
                  className="h-6 w-6 cursor-pointer"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                  />
                </svg>
              </div>
            </div>
            <p className="py-1 text-sm text-gray-600">Ivan Ryan</p>
            <p className="text-sm text-gray-600">k_pacheco@gmail.com</p>
            <p className="py-1 text-sm text-gray-600">{`(401) 706-3344`}</p>
            <hr className="my-4 border-t border-gray-300" />
          </div>
          <div>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-md font-semibold">Exchanger</span>
              </div>
              <div>
                <svg
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="gray"
                  className="h-6 w-6 cursor-pointer"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                  />
                </svg>
              </div>
            </div>
            <p className="py-1 text-sm text-gray-600">Ivan Ryan</p>
            <p className="text-sm text-gray-600">k_pacheco@gmail.com</p>
            <p className="py-1 text-sm text-gray-600">{`(401) 706-3344`}</p>
            <hr className="my-4 border-t border-gray-300" />
          </div>
        </div>
      </div>
    </>
  );
}
