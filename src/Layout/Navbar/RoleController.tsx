import React, { useState, useEffect } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PersonIcon from '@mui/icons-material/Person';
import PhotoCameraFrontIcon from '@mui/icons-material/PhotoCameraFront';
import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';

import { useReactiveVar } from '@apollo/client';
import { userEffectiveRoleVar } from '../../graphql';

export default function RoleController() {
  const userEffectiveRole = useReactiveVar(userEffectiveRoleVar);

  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    effectiveRole: string | null,
  ) => {
    if (effectiveRole !== null) userEffectiveRoleVar(effectiveRole);
  };

  return (
    <ToggleButtonGroup
      value={userEffectiveRole}
      exclusive
      onChange={handleAlignment}
      aria-label="role controller"
      sx={{ marginLeft: { xs: '10px', md: '20px' } }}
    >
      <Tooltip title="Admin" TransitionComponent={Zoom} arrow>
        <ToggleButton value="admin" size="small" aria-label="admin">
          <AdminPanelSettingsIcon fontSize="small" />
        </ToggleButton>
      </Tooltip>
      <Tooltip title="General Owner" TransitionComponent={Zoom} arrow>
        <ToggleButton value="owner" size="small" aria-label="owner">
          <PersonIcon fontSize="small" />
        </ToggleButton>
      </Tooltip>
      <Tooltip title="Guest" TransitionComponent={Zoom} arrow>
        <ToggleButton value="nologin" size="small" aria-label="nologin">
          <PhotoCameraFrontIcon fontSize="small" />
        </ToggleButton>
      </Tooltip>
    </ToggleButtonGroup>
  );
}
