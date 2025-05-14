/**
 * ChangePasswordForm Component
 * 
 * This component is used to change the user's password.
 * It includes a form with fields for the current password, new password, and confirmation of the new password.
 * It uses Material-UI for styling and icons.
 * It also includes a modal for displaying confirmation messages.
 * It uses the Framer Motion library for animations.
 */
import { useState } from "react";
import PropTypes from "prop-types";
import { Card, CardContent, Typography, Divider, TextField, Grid, Box, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { changePassword } from "../../api/auth/auth_API.js";
import GenericModal from "../../components/popUp/generic/GenericModal.jsx";
import SaveButton from "../../components/button/SaveButton.jsx";

/**
 * ChangePasswordForm component that displays a form for changing the user's password.
 * 
 * @component
 * @param {boolean} showForm - Whether to show the form or not.
 * @return {JSX.Element} - The ChangePasswordForm component.
 */
const ChangePasswordForm = ({ showForm }) => {
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const handleShowConfirmationModal = () => setShowConfirmationModal(true);
    const handleHideConfirmationModal = () => setShowConfirmationModal(false);

    const [form, setForm] = useState({
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: "",
    });

    const [showPassword, setShowPassword] = useState({
        oldPassword: false,
        newPassword: false,
        confirmNewPassword: false,
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError("");
    };

    /**
     * Toggles the visibility of the password field.
     * 
     * @param {string} field - The name of the field to toggle.
     * @returns {void}
     */
    const togglePasswordVisibility = (field) => {
        setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
    };

    /**
     * Clears the form fields after successful submission.
     * 
     * @return {void}
     */
    const clearForm = () => {
        setForm({
            oldPassword: "",
            newPassword: "",
            confirmNewPassword: "",
        });
    };

    /**
     * Handles the form submission and validates the input fields.
     * 
     * @param {object} e - The event object.
     * @return {void}
     */
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (form.newPassword !== form.confirmNewPassword) {
            toast.error("Las contraseñas nuevas no coinciden.", { duration: 10000 });
            return;
        }

        const passwordRegex = /^(?=.*[0-9].*[0-9])(?=.*[!@#$%"^&*.])[A-Za-z0-9!@#$%^&*."]{8,}$/;

        if (!passwordRegex.test(form.newPassword)) {
            toast.error(
                'La contraseña debe tener al menos ocho caracteres, incluyendo dos números y un caracter especial (!@#$%"^&*.).',
                { duration: 10000 }
            );
            return;
        }

        handleShowConfirmationModal();
    };

    /**
     * Handles the confirmation of the password change.
     * 
     * @param {object} e - The event object.
     * @return {void}
     */
    const handleConfirmPasswordChange = async () => {
        try {
            const response = await changePassword(form.oldPassword, form.newPassword, form.confirmNewPassword);
            toast.success(response.message, { icon: "🔑" });
            clearForm();
        } catch (error) {
            toast.error(error.message);
        }
        handleHideConfirmationModal(); 
    };

    if (!showForm) return null; 

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
            >
                <Card sx={{ padding: 3, backgroundColor: "#fff", borderRadius: "15px", boxShadow: 3 }}>
                    <CardContent>
                        <Typography variant="h6" gutterBottom sx={{ color: "#1976d2", fontFamily: "Montserrat, sans-serif" }}>
                            Cambiar Contraseña
                        </Typography>
                        <Divider sx={{ marginBottom: 2, borderColor: "#1976d2" }} />

                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                {["oldPassword", "newPassword", "confirmNewPassword"].map((field) => (
                                    <Grid item xs={4} key={field}>
                                        <TextField
                                            label={
                                                field === "oldPassword"
                                                    ? "Contraseña Actual"
                                                    : field === "newPassword"
                                                        ? "Nueva Contraseña"
                                                        : "Confirmar Nueva Contraseña"
                                            }
                                            type={showPassword[field] ? "text" : "password"}
                                            fullWidth
                                            name={field}
                                            value={form[field]}
                                            onChange={handleChange}
                                            required
                                            error={field === "confirmNewPassword" && Boolean(error)}
                                            helperText={field === "confirmNewPassword" && error}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton onClick={() => togglePasswordVisibility(field)} edge="end">
                                                            {showPassword[field] ? <VisibilityOff /> : <Visibility />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Grid>
                                ))}

                                <Grid item xs={12}>
                                    <Box sx={{ display: "flex", justifyContent: "flex-end", marginBottom: -2 }}>
                                        <SaveButton acceptAction={handleSubmit} labelAccept="Guardar" />
                                    </Box>
                                </Grid>
                            </Grid>
                        </form>
                    </CardContent>
                </Card>
            </motion.div>

            <GenericModal
                show={showConfirmationModal}
                onHide={handleHideConfirmationModal}
                title="¿Desea confirmar el cambio de contraseña?"
                bodyText="Si confirmar el cambio, al iniciar sesión deberá utilizar la nueva contraseña."
                onButtonClick={handleConfirmPasswordChange}
                buttonText="Confirmar"
            />
        </>
    );
};

ChangePasswordForm.propTypes = {
    showForm: PropTypes.bool.isRequired,
};

export default ChangePasswordForm;
