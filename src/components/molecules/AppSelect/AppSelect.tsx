import type {AppSelectProps, AppSelectChangeType} from '@molecules/AppSelect/AppSelect.props';
import styles from '@molecules/AppSelect/AppSelect.module.css';
import Field from '@molecules/Field/Field';
import cn from 'classnames';
import Select from 'react-select';
import type {SelectOption} from '@models';

const AppSelect = <T extends string>({
                                         options,
                                         label,
                                         error,
                                         isErrorActive,
                                         value,
                                         className,
                                         placeholder,
                                         isClearable,
                                         onChange,
                                         onClear,
                                     }: AppSelectProps<T>) => {
    const changeHandler = (option: AppSelectChangeType<T>) => {
        if (option === null && onClear) {
            onClear();
            return;
        }
        if (option) {
            onChange(option.value);
            return;
        }
    };

    return (
        <Field
            className={cn(styles.field, className)}
            label={label}
            error={error}
            isErrorActive={isErrorActive}
        >
            <Select<SelectOption<T>, false>
                options={options}
                isMulti={false}
                isClearable={isClearable}
                value={options?.find((option) => option.value === value)}
                placeholder={placeholder}
                onChange={changeHandler}
                classNames={{
                    container: () => styles.container,
                    control: ({isFocused}) => cn(
                        styles.control,
                        isFocused && styles.controlFocused,
                    ),
                    dropdownIndicator: () => styles.dropdownIndicator,
                    indicatorsContainer: () => styles.indicatorsContainer,
                    clearIndicator: () => styles.clearIndicator,
                    indicatorSeparator: () => styles.indicatorsSeparator,
                    input: () => styles.input,
                    menu: () => styles.menu,
                    menuList: () => styles.menuList,
                    menuPortal: () => styles.menuPortal,
                    option: ({isSelected, isFocused}) => cn(
                        styles.option,
                        isSelected && styles.optionSelected,
                        isFocused && styles.optionFocused,
                    ),
                    valueContainer: () => styles.valueContainer,
                    singleValue: () => styles.singleValue,
                }}
            />
        </Field>
    );
};

export default AppSelect;
