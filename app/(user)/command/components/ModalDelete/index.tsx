"use client";
import { Command } from "@/app/lib/definitions";
import { Modal } from "@/app/ui/components/Modal";
import { cn } from "@/app/utils/cn";
import React from "react";
import { useModalDelete } from "./useModalDelete";
import { Spinner } from "@/app/ui/components/Spinner";
import { Button } from "@/app/ui/components/Button/Button";

export type IModalDeleteType = Partial<
    Pick<Command, "uuid" | "name" | "description">
> & {
    onClose: () => void;
    isOpen: boolean;
};

const ModalDelete: React.FC<IModalDeleteType> = ({
    name,
    uuid,
    description,
    isOpen,
    onClose,
}) => {
    const { onHandleDelete, onPendingRequest } = useModalDelete({ onClose });

    return (
        <Modal
            position="center"
            className="w-1/2"
            containerClassName="px-4"
            onClose={onClose}
            open={isOpen}
        >
            <div className="text-lg font-semibold py-2">
                Deseja deletetar esse comando?
            </div>
            <div className="p-2 py-4 bg-gray-100 shadow-sm rounded-md">
                <div className="mt-1 text-md font-semibold">{name}</div>
                <div className="text-gray-500 text-sm">{description}</div>
            </div>
            <div className="mt-4 flex gap-2 w-full justify-end">
                <Button
                    type="button"
                    className={cn(
                        "bg-transparent hover:bg-indigo-600 text-indigo-700 font-semibold hover:text-white border border-indigo-500 hover:border-transparent rounded-md",
                        onPendingRequest &&
                            "text-gray-500 bg-gray-100 border-gray-300 hover:bg-gray-100 cursor-default hover:border-gray-300 hover:text-gray-500"
                    )}
                    onClick={onClose}
                >
                    Cancelar
                </Button>
                <Button
                    type="button"
                    className={cn(onPendingRequest && "hover:bg-indigo-500 bg-indigo-500 cursor-default")}
                    onClick={() => uuid && onHandleDelete(uuid)}
                >
                    {onPendingRequest ? (
                        <Spinner className="w-4 h-4 m-0" />
                    ) : (
                        "Deletar"
                    )}
                </Button>
            </div>
        </Modal>
    );
};

export default ModalDelete;
