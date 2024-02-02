"use client";

import React, { useCallback, useRef } from "react";
import { useCommandCreateForm } from "./useCommandCreateForm";
import { Input } from "../../components/Input";
import Variables from "./components/Variables";
import { QuestionMarkCircleIcon } from "@heroicons/react/20/solid";
import { Tooltip } from "@radix-ui/themes";
import Badge from "../../badge";
import { Controller } from "react-hook-form";
import ModalPreview from "./components/ModalPreview";
import { CommandFormProvider } from "./context";
import LoadingCommand from "./components/LoadingCommand";

const Form: React.FC = () => {
    const {
        onHandleSubmit,
        watch,
        control,
        getValues,
        register,
        errors,
        state,
    } = useCommandCreateForm();

    const myRef = useRef<HTMLDivElement>(null);

    const commandName = useCallback(() => {
        const fieldValue = getValues("name");
        if (!fieldValue) {
            return "--";
        }

        return fieldValue;
    }, [watch("name")]);

    const BadgeClassName = "bg-slate-700 border-slate-900 text-gray-300";

    if (state["PENDING_COMMAND_REQUEST"]) {
        return <LoadingCommand />;
    }

    return (
        <div className="flex flex-col h-full">
            <div className="flex w-full h-full gap-2">
                <form id="commandForm" onSubmit={onHandleSubmit}>
                    <div className="flex flex-col gap-2 flex-1">
                        <div className="font-semibold text-lg py-2">
                            {commandName()}
                        </div>
                        <Input
                            label="Nome do Comando"
                            placeholder="Nome do comando"
                            error={errors.name?.message}
                            {...register("name")}
                        />
                        <div className="flex flex-col">
                            <label
                                className="block text-sm font-medium leading-6 text-gray-900"
                                htmlFor={"description"}
                            >
                                Descrição do Comando
                            </label>
                            <div className="mt-1">
                                <textarea
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 p-2 outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-inset resize-none focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    placeholder="Descrição do comando"
                                    {...register("description")}
                                />
                            </div>
                        </div>
                        <Input
                            label={
                                <>
                                    Comando
                                    <Tooltip
                                        content={
                                            <div className="flex flex-col gap-2 max-w-[250px]">
                                                <span>
                                                    Este campo permite que você
                                                    insira qualquer texto e
                                                    também crie variáveis para
                                                    valores dinâmicos. As
                                                    variáveis são criadas
                                                    colocando o nome delas entre
                                                    colchetes{" "}
                                                    <Badge
                                                        className={
                                                            BadgeClassName
                                                        }
                                                    >
                                                        [...]
                                                    </Badge>
                                                </span>
                                                <span>
                                                    IP1#
                                                    <Badge
                                                        className={
                                                            BadgeClassName
                                                        }
                                                    >
                                                        [IP]
                                                    </Badge>
                                                    #
                                                    <Badge
                                                        className={
                                                            BadgeClassName
                                                        }
                                                    >
                                                        [PORT]
                                                    </Badge>
                                                </span>
                                                <span className="text-gray-200">
                                                    Saida: IP1#999.999.999#0000
                                                </span>
                                            </div>
                                        }
                                    >
                                        <QuestionMarkCircleIcon className="cursor-pointer h-[14px] w-[14px]" />
                                    </Tooltip>
                                </>
                            }
                            error={errors.command?.message}
                            labelClassName="items-center"
                            placeholder="Comando"
                            helper="Para utilizar as variáveis envolva o nome dela entre parênteses. Exemplo: [PORT]"
                            {...register("command")}
                        />
                    </div>
                </form>
                <div className="flex flex-1">
                    <Controller
                        name="variables"
                        control={control}
                        defaultValue={[]}
                        render={({ field }) => (
                            <Variables
                                onSubmit={field.onChange}
                                variables={field.value || []}
                            />
                        )}
                    />
                </div>
            </div>
            <div className="flex w-full justify-end py-4">
                <button
                    form="commandForm"
                    type="submit"
                    className="inline-flex items-center gap-x-2 rounded-md bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    {getValues("_id") ? "Ataulizar" : "Cadastrar"}
                </button>
            </div>
            <ModalPreview />
        </div>
    );
};

export type ICommandFormType = {
    uuid?: string;
};

export const CommandCreateForm: React.FC<ICommandFormType> = (data) => {
    return (
        <CommandFormProvider uuid={data.uuid}>
            <Form />
        </CommandFormProvider>
    );
};

export default CommandCreateForm;
