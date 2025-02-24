import { Card, CardContent, Typography, Divider, Grid, Avatar, Box, Paper } from "@mui/material";
import { useUser } from "../../hooks/user/useUser.jsx";
import UserBanner from "./UserBanner.jsx";
import ChangePasswordForm from "./ChangePasswordForm.jsx";
import {useState} from "react";

const Profile = () => {

    const userSession = useUser();

    const [showChangePasswordForm, setShowChangePasswordForm] = useState(false);

    if (!userSession) {
        return <p>Loading user information...</p>;
    }

    return (
        <>
            <UserBanner
                title={`Perfil de ${userSession.name}`}
                visibleButtons={["goBack", "changePassword"]}
                showChangePasswordForm={() => setShowChangePasswordForm(!showChangePasswordForm)}
            />

            <Grid
                container
                spacing={3}
            >

                <Grid item xs={12} md={8}>
                    <Card sx={{ padding: 3, backgroundColor: '#fff', borderRadius: '10px' }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom sx={{ color: '#1976d2', fontFamily: 'Montserrat, sans-serif' }}>
                                Información de Usuario
                            </Typography>
                            <Divider sx={{ marginBottom: 2, borderColor: '#1976d2' }} />
                            <Box sx={{ marginBottom: 2 }}>
                                <Typography variant="body1" sx={{ color: '#555', fontFamily: 'Montserrat, sans-serif' }}>
                                    <strong>Email:</strong> {userSession.email}
                                </Typography>
                            </Box>
                            <Box>
                                <Typography variant="body1" sx={{ color: '#555', fontFamily: 'Montserrat, sans-serif' }}>
                                    <strong>Descripción del Rol:</strong> {userSession.userRoleResponse.description}
                                </Typography>
                            </Box>
                            <Box sx={{ marginTop: 2 }}>
                                <Typography variant="body1" sx={{ color: '#555', fontFamily: 'Montserrat, sans-serif' }}>
                                    <strong>Descripción del Estado:</strong> {userSession.userStateResponse.description}
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Paper sx={{ padding: 3, textAlign: 'center', borderRadius: '10px', backgroundColor: '#fff', fontFamily: 'Montserrat, sans-serif' }}>
                        <Avatar
                            alt={userSession.name}
                            src="https://via.placeholder.com/150"
                            sx={{
                                width: 89,
                                height: 89,
                                margin: "0 auto 16px",
                                border: '4px solid #1976d2',
                                fontFamily: 'Montserrat, sans-serif',
                                transition: 'all 0.3s ease',  // Smooth transition for hover effect
                                '&:hover': {
                                    borderColor: '#1565c0',  // Change border color on hover
                                    transform: 'scale(1.1)',  // Slightly enlarge the avatar
                                },
                            }}
                        />

                        <Typography variant="h5" sx={{ marginBottom: 2, color: '#1976d2', fontFamily: 'Montserrat, sans-serif' }}>
                            {userSession.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 1, fontFamily: 'Montserrat, sans-serif' }}>
                            {userSession.userRoleResponse.roleName}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" sx={{fontFamily: 'Montserrat, sans-serif'}}>
                            {userSession.userStateResponse.stateName}
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <ChangePasswordForm showForm={showChangePasswordForm} />
                </Grid>
            </Grid>
        </>
    );
};

export default Profile;
