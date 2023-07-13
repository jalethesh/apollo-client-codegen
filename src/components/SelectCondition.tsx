import React, { useEffect, useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';

import {
  Maybe,
  useGetConditionsLazyQuery,
  useGetMultiplierQuery,
} from '../types/graphql';

interface SelectConditionProps {
  value: Maybe<string> | undefined;
  onChange: (value: any) => void;
  disabled?: boolean;
}

export default function SelectCondition(props: SelectConditionProps) {
  const { value, onChange, disabled } = props;

  const [open, setOpen] = useState(false);
  const [
    getConditions,
    { data: dataCondition, loading: loadingCondition, error },
  ] = useGetConditionsLazyQuery();
  const {
    data: multipliersData,
    loading: multipliersLoading,
    error: multipliersError,
  } = useGetMultiplierQuery();
  useEffect(() => {
    if (open) {
      getConditions();
    }
  }, [open, getConditions, props]);

  const conditionOptions =
    dataCondition?.conditions?.map((option) => option?.usCode) || [];

  return (
    <Autocomplete
      id="select-condition-async"
      sx={{ width: '100%' }}
      value={value}
      size="small"
      onChange={(_, value) => onChange(value)}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      disabled={disabled}
      options={conditionOptions}
      loading={loadingCondition}
      renderInput={(params) => (
        <TextField
          {...params}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loadingCondition ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
}
