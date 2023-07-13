import React, { useState, useMemo, useEffect } from 'react';
import Slider, { SliderThumb } from '@mui/material/Slider';
import { useHistory } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import throttle from 'lodash/throttle';
import { useTheme, styled } from '@mui/material/styles';
import Popper from '@mui/material/Popper';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import AddIcon from '@mui/icons-material/Add';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import Autocomplete, {
  AutocompleteCloseReason,
  autocompleteClasses,
} from '@mui/material/Autocomplete';
import InputBase from '@mui/material/InputBase';
import Box from '@mui/material/Box';
import MuiButton from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import { toast } from 'react-toastify';

import { GET_GENERIC_ITEMS } from '../../graphql/queries';

interface PopperComponentProps {
  anchorEl?: any;
  disablePortal?: boolean;
  open: boolean;
}

const StyledAutocompletePopper = styled('div')(({ theme }) => ({
  [`& .${autocompleteClasses.paper}`]: {
    boxShadow: 'none',
    margin: 0,
    color: 'inherit',
    fontSize: 13,
  },
  [`& .${autocompleteClasses.listbox}`]: {
    backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#1c2128',
    padding: 0,
    [`& .${autocompleteClasses.option}`]: {
      minHeight: 'auto',
      alignItems: 'flex-start',
      padding: 8,
      borderBottom: `1px solid  ${
        theme.palette.mode === 'light' ? ' #eaecef' : '#30363d'
      }`,
      '&[aria-selected="true"]': {
        backgroundColor: 'transparent',
      },
      '&[data-focus="true"], &[data-focus="true"][aria-selected="true"]': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  },
  [`&.${autocompleteClasses.popperDisablePortal}`]: {
    position: 'relative',
  },
}));

const PopperComponent = (props: PopperComponentProps) => {
  const { disablePortal, anchorEl, open, ...other } = props;
  return <StyledAutocompletePopper {...other} />;
};

const StyledPopper = styled(Popper)(({ theme }) => ({
  border: `1px solid ${theme.palette.mode === 'light' ? '#e1e4e8' : '#30363d'}`,
  boxShadow: `0 8px 24px ${
    theme.palette.mode === 'light' ? 'rgba(149, 157, 165, 0.2)' : 'rgb(1, 4, 9)'
  }`,
  borderRadius: 6,
  width: '100%',
  zIndex: theme.zIndex.drawer,
  fontSize: 13,
  color: theme.palette.mode === 'light' ? '#24292e' : '#c9d1d9',
  backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#1c2128',
  position: 'relative',
}));

const StyledInput = styled(InputBase)(({ theme }) => ({
  position: 'relative',
  padding: 10,
  width: '100%',
  borderBottom: `1px solid ${
    theme.palette.mode === 'light' ? '#eaecef' : '#30363d'
  }`,
  '& input': {
    borderRadius: 4,
    backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#0d1117',
    padding: 8,
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    border: `1px solid ${
      theme.palette.mode === 'light' ? '#eaecef' : '#30363d'
    }`,
    fontSize: 14,
    '&:focus': {
      boxShadow: `0px 0px 0px 3px ${
        theme.palette.mode === 'light'
          ? 'rgba(3, 102, 214, 0.3)'
          : 'rgb(12, 45, 107)'
      }`,
      borderColor: theme.palette.mode === 'light' ? '#0366d6' : '#388bfd',
    },
  },
}));

interface Props {
  onSelect: (value: any) => void;
  buttonText: string;
}

export default function ChangeCards(props: Props) {
  const { onSelect, buttonText } = props;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(0);
  const history = useHistory();
  const [
    getGenericItems,
    {
      data: dataGenItem,
      loading: loadingGenItem,
      error: loadingError,
      fetchMore,
    },
  ] = useLazyQuery(GET_GENERIC_ITEMS, { variables: { page: 0, perPage: 20 } });

  const fetch = useMemo(
    () =>
      throttle((partialName) => {
        try {
          getGenericItems({
            // @ts-ignore
            variables: { partialName, page: 0 },
          });
        } catch (error) {
          toast.error(`${error}`, {
            theme: 'dark',
          });
        }
      }, 200),
    [getGenericItems],
  );

  useEffect(() => {
    if (dataGenItem) {
      setItems(dataGenItem.genericItems);
    }
  }, [dataGenItem]);

  const open = Boolean(anchorEl);
  const id = open ? 'search-cards' : undefined;

  useEffect(() => {
    let active = true;
    setPage(0);
    fetch(searchTerm);
    return () => {
      active = false;
    };
  }, [fetch, searchTerm]);

  const theme = useTheme();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    if (anchorEl) {
      anchorEl.focus();
    }
    setAnchorEl(null);
  };

  return (
    <Box sx={{ width: { xs: '100%', sm: '200px', xl: '264px' } }}>
      <MuiButton
        startIcon={<AddIcon />}
        aria-describedby={id}
        onClick={handleClick}
        variant="outlined"
        sx={{ width: { xs: '100%', md: '100%' } }}
      >
        {buttonText}
      </MuiButton>
      <StyledPopper
        id={id}
        open={open}
        anchorEl={anchorEl}
        placement="bottom-start"
        sx={{ maxWidth: { xs: 'calc(100% - 48px)', sm: '200px', xl: '264px' } }}
      >
        <ClickAwayListener onClickAway={handleClose}>
          <div>
            <Autocomplete
              open
              onClose={(
                event: React.ChangeEvent<{}>,
                reason: AutocompleteCloseReason,
              ) => {
                if (reason === 'selectOption') {
                  handleClose();
                }
              }}
              loading={loadingGenItem}
              onChange={(event, newValue, reason) => {
                if (
                  event.type === 'keydown' &&
                  (event as React.KeyboardEvent).key === 'Backspace' &&
                  reason === 'removeOption'
                ) {
                  return;
                }
                onSelect(newValue);
                setSearchTerm('');
              }}
              PopperComponent={PopperComponent}
              noOptionsText="No cards"
              ListboxProps={{
                onScroll: (event: React.SyntheticEvent) => {
                  const listboxNode = event.currentTarget;
                  if (
                    listboxNode.scrollTop + listboxNode.clientHeight ===
                    listboxNode.scrollHeight
                  ) {
                    setPage((pv) => pv + 1);
                    fetchMore!({ variables: { page: page + 1 } }).then(
                      (res) => {
                        setItems((pv) => pv.concat(...res.data.genericItems));
                      },
                    );
                  }
                },
                style: {
                  maxHeight: '400px',
                },
              }}
              renderOption={(props, option: any, { selected }) => (
                <li {...props} key={option.id} style={{ alignItems: 'center' }}>
                  <Box
                    sx={{
                      '&:hover .big-image': {
                        opacity: 1,
                        visibility: 'visible',
                      },
                    }}
                  >
                    <Box
                      component="img"
                      sx={{
                        height: 80,
                        mr: '5px',
                        ml: '-2px',
                      }}
                      src={option.imageUriPng}
                    />
                    <Box
                      component="img"
                      sx={{
                        height: {
                          xs: '300px',
                          sm: '400px',
                          md: '50vh',
                          lg: '80vh',
                        },
                        opacity: 0,
                        visibility: 'hidden',
                        transition: 'visibility 0ms, opacity 0ms',
                        mr: '5px',
                        ml: '-2px',
                        position: 'absolute',
                        top: { xs: '60px', lg: '-120px' },
                        left: { xs: '130px', sm: '270px', lg: '300px' },
                        zIndex: 50,
                      }}
                      src={option.imageUriPng}
                      className="big-image"
                    />
                  </Box>
                  <Box
                    sx={{
                      flexGrow: 1,
                      '& span': {
                        color:
                          theme.palette.mode === 'light'
                            ? '#586069'
                            : '#8b949e',
                      },
                    }}
                  >
                    {option.name}
                    <br />
                    {option.setName}
                  </Box>
                </li>
              )}
              options={items}
              getOptionLabel={(option: any) => option.name}
              onInputChange={(event, value, reason) => {
                if (reason === 'reset') {
                  return;
                }
                setSearchTerm(value);
              }}
              inputValue={searchTerm}
              renderInput={(params) => (
                <>
                  <StyledInput
                    ref={params.InputProps.ref}
                    inputProps={params.inputProps}
                    autoFocus
                    placeholder="Search cards"
                  />
                  {searchTerm && (
                    <IconButton
                      size="small"
                      sx={{ position: 'absolute', right: '20px', top: '18px' }}
                      onClick={() => setSearchTerm('')}
                    >
                      <ClearIcon sx={{ fontSize: '12px' }} />
                    </IconButton>
                  )}
                </>
              )}
              filterOptions={(x) => x}
            />
          </div>
        </ClickAwayListener>
      </StyledPopper>
    </Box>
  );
}
