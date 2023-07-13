import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import throttle from 'lodash/throttle';
import { useTheme, styled } from '@mui/material/styles';
import Popper from '@mui/material/Popper';
import Autocomplete, {
  AutocompleteCloseReason,
  autocompleteClasses,
} from '@mui/material/Autocomplete';
import InputBase from '@mui/material/InputBase';
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import { toast } from 'react-toastify';
import { GET_GENERIC_ITEMS } from 'graphql/queries';
import { GenericItemObject } from 'types/graphql';

const StyledAutocompletePopper = styled(Popper)(({ theme }) => ({
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

const StyledInput = styled(InputBase)(({ theme }) => ({
  position: 'relative',
  backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#1c2128',

  maxWidth: '100%',
  [theme.breakpoints.down('md')]: {
    width: '100%',
  },
  [theme.breakpoints.up('md')]: {
    width: '300px',
  },
  [theme.breakpoints.up('lg')]: {
    width: '400px',
  },

  // borderBottom: `1px solid ${theme.palette.mode === "light" ? "#eaecef" : "#30363d"
  //   }`,
  '& input': {
    borderRadius: 4,
    backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#0d1117',
    padding: 6,
    paddingLeft: 12,
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    border: `3px solid ${
      theme.palette.mode === 'light' ? '#eaecef' : '#388bfd'
    }`,
    fontSize: 16,
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
  onSelect: (selection: GenericItemObject) => void;
  listId?: number;
  placeholder?: string;
  itemPerPage?: number;
}

export default function AutoCompleteCardSearch(props: Props) {
  const { listId, onSelect, placeholder, itemPerPage } = props;

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
  ] = useLazyQuery(GET_GENERIC_ITEMS, {
    variables: { page: 0, perPage: itemPerPage || 50 },
  });

  const fetch = useMemo(
    () =>
      throttle((partialName) => {
        try {
          getGenericItems({
            // @ts-ignore
            variables: { partialName, page: 0, perPage: 50 },
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
    setItems(dataGenItem?.genericItems || []);
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

  const handleClose = () => {
    if (anchorEl) {
      anchorEl.focus();
    }
    setAnchorEl(null);
  };

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <Autocomplete
        onClose={(
          event: React.ChangeEvent<{}>,
          reason: AutocompleteCloseReason,
        ) => {
          if (reason === 'selectOption') {
            handleClose();
          }
        }}
        sx={{ position: 'relative', width: { xs: '100%', md: 'auto' } }}
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
        PopperComponent={StyledAutocompletePopper}
        noOptionsText="No cards"
        ListboxProps={{
          onScroll: (event: React.SyntheticEvent) => {
            const listboxNode = event.currentTarget;
            if (
              listboxNode.scrollTop + listboxNode.clientHeight ===
              listboxNode.scrollHeight
            ) {
              setPage((pv) => pv + 1);
              fetchMore!({ variables: { page: page + 1 } }).then((res) => {
                setItems((pv) => pv.concat(...res.data.genericItems));
              });
            }
          },
          style: {
            maxHeight: '400px',
          },
        }}
        renderOption={(props, option, { selected }) => (
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
                src={option.imageUriSmall}
              />
              <Box
                component="img"
                sx={{
                  height: { xs: '300px', sm: '400px', md: '50vh', lg: '80vh' },
                  opacity: 0,
                  visibility: 'hidden',
                  transition: 'visibility 0ms, opacity 0ms',
                  mr: '5px',
                  ml: '-2px',
                  position: 'absolute',
                  top: { xs: '60px', lg: '20px' },
                  left: { xs: '130px', sm: '270px', lg: '400px' },
                  zIndex: 50,
                }}
                src={option.imageUriNormal}
                className="big-image"
              />
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                '& span': {
                  color: theme.palette.mode === 'light' ? '#586069' : '#8b949e',
                },
              }}
            >
              {option.name}
              <br />
              {option.setName}
              <Box sx={{ color: 'text.secondary' }}>
                {option.lang !== 'en' && `language: ${option.lang}`}
              </Box>
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
          <Box
            sx={{
              position: 'relative',
              width: { sm: 'auto', md: 'fit-content' },
            }}
          >
            <StyledInput
              ref={params.InputProps.ref}
              inputProps={params.inputProps}
              placeholder={placeholder}
              inputRef={inputRef}
            />
            <IconButton
              size="small"
              sx={{ position: 'absolute', right: '10px', top: '8px' }}
              onClick={() => setSearchTerm('')}
            >
              {searchTerm ? (
                <ClearIcon sx={{ fontSize: '14px' }} />
              ) : (
                <SearchIcon sx={{ fontSize: '14px' }} />
              )}
            </IconButton>
          </Box>
        )}
        filterOptions={(x) => x}
      />
    </>
  );
}
