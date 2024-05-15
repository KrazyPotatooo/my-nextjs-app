import React, { useEffect } from 'react';
import { Container, Typography, TextField, Button, Box, CircularProgress } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import useSWR from 'swr';
import axios from 'axios';

const fetcher = (url: string) => axios.get(url).then(res => res.data);

const Profile: React.FC = () => {
  const { data, error } = useSWR('/api/user', fetcher);

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      bio: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      bio: Yup.string().max(500, 'Bio should be 500 characters or less'),
    }),
    onSubmit: (values) => {
      console.log('Form Values:', values);
      alert(JSON.stringify(values, null, 2));
    },
    enableReinitialize: true, // Allows form to reinitialize when initialValues change
  });

  useEffect(() => {
    if (data) {
      formik.setValues({
        name: data.name,
        email: data.email,
        bio: data.bio,
      });
    }
  }, [data]);

  if (error) return <div>Failed to load user data</div>;
  if (!data) return <CircularProgress />;

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Profile
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="name"
            name="name"
            label="Name"
            margin="normal"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
            margin="normal"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            fullWidth
            id="bio"
            name="bio"
            label="Bio"
            margin="normal"
            multiline
            rows={4}
            value={formik.values.bio}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.bio && Boolean(formik.errors.bio)}
            helperText={formik.touched.bio && formik.errors.bio}
          />
          <Box sx={{ mt: 2 }}>
            <Button color="primary" variant="contained" fullWidth type="submit">
              Save
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default Profile;
