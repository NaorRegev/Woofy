import React, { useState } from 'react';
import { Popover, Badge, IconButton, Box, Typography, Tooltip, List, ListSubheader, ListItemAvatar, ListItemText, ListItemButton, Avatar, Divider, Button } from '@mui/material';
import Iconify from '../../../components/iconify';
import Scrollbar from '../../../components/scrollbar';
import { fToNow } from '../../../utils/format-time';
import { useNotifications } from '../../../provider/NotificationContext';

const NotificationsPopover = () => {
    const { notifications: notificationsData, markAllAsRead, markAsRead } = useNotifications();
    const notifications = Array.isArray(notificationsData) ? notificationsData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) : [];
    const [open, setOpen] = useState(null);

    const handleOpen = (event) => {
        setOpen(event.currentTarget);
    };

    const handleClose = () => {
        setOpen(null);
    };

    const handleMarkAllAsRead = async () => {
        await markAllAsRead();
    };

    const handleNotificationClick = async (id) => {
        await markAsRead(id);
    };

    const totalUnRead = notifications?.filter((item) => item.unRead).length || 0;

    return (
        <>
            <IconButton color={open ? 'primary' : 'default'} onClick={handleOpen}>
                <Badge badgeContent={totalUnRead} color="error">
                    <Iconify width={24} icon="solar:bell-bing-bold-duotone" />
                </Badge>
            </IconButton>

            <Popover
                open={!!open}
                anchorEl={open}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                PaperProps={{
                    sx: {
                        mt: 1.5,
                        ml: 0.75,
                        width: 360,
                    },
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2.5 }}>
                    <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="subtitle1">Notifications</Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            You have {totalUnRead} unread messages
                        </Typography>
                    </Box>

                    {totalUnRead > 0 && (
                        <Tooltip title="Mark all as read">
                            <IconButton color="primary" onClick={handleMarkAllAsRead}>
                                <Iconify icon="eva:done-all-fill" />
                            </IconButton>
                        </Tooltip>
                    )}
                </Box>

                <Divider sx={{ borderStyle: 'dashed' }} />

                <Scrollbar sx={{ height: { xs: 340, sm: 'auto' } }}>
                    <List
                        disablePadding
                        subheader={
                            <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
                                New
                            </ListSubheader>
                        }
                    >
                        {notifications?.slice(0, 2).map((notification) => (
                            <NotificationItem key={notification.id} notification={notification} onClick={handleNotificationClick} />
                        ))}
                    </List>

                    <List
                        disablePadding
                        subheader={
                            <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
                                Before that
                            </ListSubheader>
                        }
                    >
                        {notifications?.slice(2).map((notification) => (
                            <NotificationItem key={notification.id} notification={notification} onClick={handleNotificationClick} />
                        ))}
                    </List>
                </Scrollbar>

                <Divider sx={{ borderStyle: 'dashed' }} />

                <Box sx={{ p: 1 }}>
                    <Button fullWidth disableRipple onClick={handleMarkAllAsRead}>
                        Mark All as Read
                    </Button>
                </Box>
            </Popover>
        </>
    );
};

const NotificationItem = ({ notification, onClick }) => {
    const { avatar, title } = renderContent(notification);

    return (
        <ListItemButton
            sx={{
                py: 1.5,
                px: 2.5,
                mt: '1px',
                ...(notification.unRead && {
                    bgcolor: 'action.selected',
                }),
            }}
            onClick={() => onClick(notification.id)}
        >
            <ListItemAvatar>
                <Avatar sx={{ bgcolor: 'background.neutral' }}>{avatar}</Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={title}
                secondary={
                    <Typography
                        variant="caption"
                        sx={{
                            mt: 0.5,
                            display: 'flex',
                            alignItems: 'center',
                            color: 'text.disabled',
                        }}
                    >
                        <Iconify icon="eva:clock-outline" sx={{ mr: 0.5, width: 16, height: 16 }} />
                        {fToNow(notification.createdAt)}
                    </Typography>
                }
            />
        </ListItemButton>
    );
};

const renderContent = (notification) => {
    const title = (
        <Typography variant="subtitle2">
            {notification.title}
            <Typography component="span" variant="body2" sx={{ color: 'text.secondary' }}>
                &nbsp; {notification.description}
            </Typography>
        </Typography>
    );

    if (notification.type === 'dog_register_success') {
        return {
            avatar: <img alt={notification.title} src="/assets/icons/dog.svg" />,
            title,
        };
    }
    if (notification.type === 'register_success') {
        return {
            avatar: <img alt={notification.title} src="/assets/icons/check.svg" />,
            title,
        };
    }
    if (notification.type === 'review_added') {
        return {
            avatar: <img alt={notification.title} src="/assets/icons/star.svg" />,
            title,
        };
    }
    if (notification.type === 'appointment_added') {
        return {
            avatar: <img alt={notification.title} src="/assets/icons/calendar.svg" />,
            title,
        };
    }
    return {
        avatar: notification.avatar ? <img alt={notification.title} src={notification.avatar} /> : null,
        title,
    };
};

export default NotificationsPopover;
