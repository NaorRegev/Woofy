import React, { FunctionComponent, useMemo, CSSProperties } from "react";
import { Box, Typography, Button, TextField } from "@mui/material";

export type FullNameRowType = {
    fullNameLabel?: string;
    nameSurname?: string;
    editable?: boolean;
    name?: string;
    value?: string;
    firstName?: string;
    lastName?: string;
    firstNameError?: string;
    lastNameError?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onSave?: () => void;
    onCancel?: () => void;
    onEdit?: () => void;
    error?: string;
    isNameField?: boolean;
    isPasswordField?: boolean;
    newPassword?: string;
    confirmPassword?: string;
    newPasswordError?: string;
    confirmPasswordError?: string;
    onNewPasswordChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onConfirmPasswordChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;

    /** Style props */
    propMinWidth?: CSSProperties["minWidth"];
};

const UserProfileRow: FunctionComponent<FullNameRowType> = ({
                                                                fullNameLabel,
                                                                nameSurname,
                                                                editable,
                                                                name,
                                                                value,
                                                                firstName,
                                                                lastName,
                                                                firstNameError,
                                                                lastNameError,
                                                                onChange,
                                                                onSave,
                                                                onCancel,
                                                                onEdit,
                                                                error,
                                                                isNameField,
                                                                isPasswordField,
                                                                newPassword,
                                                                confirmPassword,
                                                                newPasswordError,
                                                                confirmPasswordError,
                                                                onNewPasswordChange,
                                                                onConfirmPasswordChange,
                                                                propMinWidth,
                                                            }) => {
    const nameSurnameStyle: CSSProperties = useMemo(() => {
        return {
            minWidth: propMinWidth,
        };
    }, [propMinWidth]);

    return (
        <Box
            sx={{
                width: "1040px",
                display: "flex",
                flexDirection: "row",
                alignItems: "start",
                justifyContent: "start",
                pt: 2,
                px: 0,
                pb: 6,
                gap: 3,
                textAlign: "left",
                fontSize: "base",
                color: "text.primary",
                fontFamily: "text.medium.normal",
                borderTop: 1,
                borderColor: "text.primary",
                boxSizing: "border-box",
            }}
        >
            <Typography
                sx={{
                    flex: 1,
                    fontSize: "base",
                    fontWeight: "bold",
                    lineHeight: "150%",
                }}
            >
                {fullNameLabel}
            </Typography>
            <Box
                sx={{
                    width: "720px",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "start",
                    justifyContent: "start",
                    gap: 3,
                    maxWidth: "100%",
                }}
            >
                {editable ? (
                    <>
                        {isNameField ? (
                            <>
                                <TextField
                                    label="First Name"
                                    variant="outlined"
                                    fullWidth
                                    name="firstName"
                                    value={firstName}
                                    onChange={onChange}
                                    error={!!firstNameError}
                                    helperText={firstNameError}
                                />
                                <TextField
                                    label="Last Name"
                                    variant="outlined"
                                    fullWidth
                                    name="lastName"
                                    value={lastName}
                                    onChange={onChange}
                                    error={!!lastNameError}
                                    helperText={lastNameError}
                                />
                            </>
                        ) : isPasswordField ? (
                            <>
                                <TextField
                                    label="Current Password"
                                    variant="outlined"
                                    fullWidth
                                    name="password"
                                    value={value}
                                    onChange={onChange}
                                    error={!!error}
                                    helperText={error}
                                    type="password"
                                />
                                <TextField
                                    label="New Password"
                                    variant="outlined"
                                    fullWidth
                                    name="newPassword"
                                    value={newPassword}
                                    onChange={onNewPasswordChange}
                                    error={!!newPasswordError}
                                    helperText={newPasswordError}
                                    type="password"
                                />
                                <TextField
                                    label="Confirm New Password"
                                    variant="outlined"
                                    fullWidth
                                    name="confirmPassword"
                                    value={confirmPassword}
                                    onChange={onConfirmPasswordChange}
                                    error={!!confirmPasswordError}
                                    helperText={confirmPasswordError}
                                    type="password"
                                />
                            </>
                        ) : (
                            <TextField
                                label={fullNameLabel}
                                variant="outlined"
                                fullWidth
                                name={name}
                                value={value}
                                onChange={onChange}
                                error={!!error}
                                helperText={error}
                            />
                        )}
                        <Box sx={{ display: "flex", gap: 2 }}>
                        <Button
                                variant="contained"
                                onClick={onSave}
                                sx={{
                                    backgroundColor: '#006cbf',
                                    borderRadius: '30px',
                                    '&:hover': {
                                        backgroundColor: '#0056a4',
                                    },
                                }}
                            >
                                Save
                            </Button>
                            <Button
                                variant="outlined"
                                onClick={onCancel}
                                sx={{
                                    borderRadius: '30px',
                                    borderColor: 'grey.500',
                                    color: 'black', // Optional: make the text color black
                                    '&:hover': {
                                        backgroundColor: 'rgba(0, 0, 0, 0.08)',
                                        borderColor: 'grey.700',
                                    },
                                }}
                            >
                                Cancel
                            </Button>

                        </Box>
                    </>
                ) : (
                    <>
                        <Typography
                            sx={{
                                flex: 1,
                                lineHeight: "150%",
                                display: "inline-block",
                                minWidth: "91px",
                                maxWidth: "100%",
                                ...nameSurnameStyle,
                            }}
                        >
                            {nameSurname}
                        </Typography>
                        <Button
                            variant="outlined"
                            onClick={onEdit}
                            sx={{
                                py: 1,
                                px: 2,
                                borderRadius: "30px",
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: 1,
                                color: 'black', // Change text color to black
                                border: '1px solid ',
                                borderColor: 'grey.500',

                                textTransform: "none",
                                '&:hover': {
                                    backgroundColor: 'rgba(0, 0, 0, 0.08)',
                                    borderColor: 'grey.700',
                                },
                            }}
                        >
                            <img
                                src="/manage-button-icon--editalt.svg"
                                alt=""
                                style={{ height: "24px", width: "24px" }}
                            />
                            <Typography
                                sx={{
                                    fontSize: "base",
                                    fontFamily: "text.medium.normal",
                                    color: "color.neutral.darker",
                                    textAlign: "left",
                                    minWidth: "30px",
                                }}
                            >
                                Edit
                            </Typography>
                        </Button>

                    </>
                )}
            </Box>
        </Box>
    );
};

export default UserProfileRow;
