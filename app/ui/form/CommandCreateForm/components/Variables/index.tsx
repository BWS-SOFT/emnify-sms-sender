import Badge from '@/app/ui/badge';
import { Input } from '@/app/ui/components/Input';
import { PlusCircleIcon } from '@heroicons/react/20/solid';
import React, { useRef } from 'react';
import { useVariables } from "./useVariables";
import { Tooltip } from '@radix-ui/themes';
import { Button } from '@/app/ui/components/Button/Button';

export type IVariableSchema = {
	name: string;
	description?: string;
};

export type IVariablesType = {
    onSubmit: (data: Array<IVariableSchema>) => void;
    variables: Array<IVariableSchema>;
    isReadOnly?: boolean;
};

const Variables: React.FC<IVariablesType> = (data) => {
	const { errors, onHandleSubmit, register, onHandleClear } =
		useVariables(data);

    const isReadOnly = data.isReadOnly || false;

    return (
        <form
            action={() => onHandleSubmit()}
            className="flex flex-col justify-start border gap-2 border-gray-200 p-2 rounded-md w-full h-full"
        >
            {!isReadOnly && (
                <>
                    <div>
                        <Input
                            label="Nome da Variável"
                            placeholder="Nome da Variável"
                            error={errors.name?.message}
                            readOnly={isReadOnly}
                            {...register("name")}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label
                            className="block text-sm font-medium leading-6 text-gray-900"
                            htmlFor={"description"}
                        >
                            Descrição
                        </label>
                        <div className="mt-1">
                            <textarea
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 p-2 outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-inset resize-none focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                placeholder="Descrição sobre a Variavel"
                                {...register("description")}
                            />
                        </div>
                    </div>
                    <div className="flex w-full justify-end">
                        <Button
                            type="submit"
                            className="inline-flex items-center gap-x-2 "
                        >
                            <PlusCircleIcon
                                className="-ml-0.5 h-5 w-5"
                                aria-hidden="true"
                            />
                            Adicionar
                        </Button>
                    </div>
                </>
            )}
            <div className="text-lg font-semibold">Variaveis do Comando</div>
            <div className="flex items-start min-h-[7rem] w-full h-full border gap-3 border-gray-200 rounded-md flex-wrap p-2">
                {data.variables.map((props, key) => (
                    <Badge
                        key={key}
                        clear
                        onClearClick={() => onHandleClear(key)}
                    >
                        {props.name}
                    </Badge>
                ))}
            </div>
        </form>
    );
};

export default Variables;
