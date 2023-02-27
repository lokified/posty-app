import React from "react";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { useGetAllpostsQuery } from "./store/postsApi";
import { Container, Grid } from "@mui/material";

const Home = () => {
  const { data, error, isLoading } = useGetAllpostsQuery();
  return (
    <Container>
      <Box className="container">
        {isLoading ? (
          <Box>Loading...</Box>
        ) : error ? (
          <Box>An Error Occured...</Box>
        ) : (
          <>
            <Typography>Posty Posts</Typography>
            <Grid container spacing={6}>
              {data?.map((post) => (
                <Grid item xs={12} md={4} lg={4}>
                  <Card key={post.id} sx={{ maxWidth: 375, margin: "1rem" }}>
                    <CardContent>
                      <Typography
                        sx={{ fontSize: 14 }}
                        color="text.secondary"
                        gutterBottom
                      >
                        {post.title}
                      </Typography>
                      <Typography variant="body2">{post.body}</Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small">View comments</Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </Box>
    </Container>
  );
};

export default Home;
