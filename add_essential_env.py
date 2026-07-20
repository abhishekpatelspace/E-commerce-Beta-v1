import subprocess

vars_to_add = {
    "GMAIL_USER": "abhishekpatelspacework@gmail.com",
    "GMAIL_PASS": "ubbwqtjlxtzmymnn",
    "JWT_SECRET": "craftore_default_secure_secret_token_key",
    "FIREBASE_PROJECT_ID": "craftore-160cc",
    "FIREBASE_CLIENT_EMAIL": "firebase-adminsdk-fbsvc@craftore-160cc.iam.gserviceaccount.com",
    "FIREBASE_PRIVATE_KEY": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDeWpuo0K0yLGiF\nuH53S2KsbhomJBh0joQ+3F1kqNFy3glXjCQ4/8oTZaJI1r1fPTIrZbRme2kR1YCc\n8pYeLAMfzCNNt7ThhzNYVfOA59na5qXpa31agC/9l5oe7qwy8GD9ZWEiaWO2L1nv\nU0zGf1zhpJ0GKw7n9AohWbBQlRWF6TO8jPy/VOxTn7mpuLsyRI6LaNfcLOfgRrqh\ne/8yqYsE8By6ys/NS+EmmdGrOluaYPd/aKGW4NarZu8QSsb2FFoRuLzDf1mpsaXI\nR7VCAlXjBAb4P3Fa80PsXl2H5/XicLjoVwIYiWKs+QDB/B3TsMWvZvJ+HlJ7ksuK\nUK6mnzo9AgMBAAECggEADzLYUv4N6KZlGpwqy31eqEn6Wu26sjTk+zsAM0I1gYmF\nz/MnWAdmnlQjIfbJCPqGNGCGUpRQRpohFBlM2OZ0luF9mZwGBChurQoVqT5ag35N\nNvBUUtxSQMjyYveOKQk0nVLRrz15mwQPkgP6n9LS3CWZX3OQAvDebxB8tHVhpukn\nhUeJ1U6pJ9HMnKb4vedg3rCfjId/2Xk/U+Lfb7Yzz8FzMAYFdjyADnuNHy26u7uR\n/SJ7SeIuc76LSwoa4kGnK6pmT8MmcYdhb8cYvRZTXxuQjteyvv7YJBFD0eneDg1T\nmQLz/RJbaCLZ8FGK+0Z5orxGQPA/fVgW6j21gZojIQKBgQD2vRDC7Fo0yRKgCA4E\nkBBUHcjqOUZq+9EF7UJPFpmVZJMJe2iDmm8GeUoPqnDQaWCD5+MeUWpww8MSW2Le\nlyXMNhi8BZISAKFDo3BbV/llL8VCcpgtDg94wAn4RGdaX0HhjLE5ha+MTRmHwyYe\ndHLP9mxu4aVUMQBctACCg5/7iQKBgQDmszqE8Xya3TA/4A6kJOSAfJaPwQOcei3/\nYzyG34auZ4teGjA1g/6mRioVF2NQBIsC1qRnuYBcTvF3PLjI5nRBA9Lw+qXac5p4\nyL8q5AMCQfbWq+1kCNT8GJwaQeasi//7SMHwHjaFjzHuf874aRVVVjIGC/7AD/aP\nFlvExyTYFQKBgQCdYCA1w90ReAK6MgkG3gCcNlc1Fg0VJcK/ngJCQa76O6kRTjZu\nYm1YWrpjXZoRRHU8DQavCszyWdqtdb6NLSj9pK+IFaGCfAZgBvoeOPGomZye8kqf\nyi0SHqL9SFwHp2R1AXD0uJEs0uxqzI0etbWZcZrd6myyU4LgnisJE/1RyQKBgFfr\nVhH0NhiO0ySErw+/P5X35SlD1ax8o6sAlsCPzzQIIgTq1hSPCS008DS5hQ+pq5CZ\nXG5rM4/6Reu7KHDn4sYkPu+3lh16kRQW7UPbQYpKuVd2jjHha8nnVxZqpw57DEMn\np0FrQjwEJnNOIgJpicfL4aSMTbnEW6KMUszbWB9BAoGBAOdHVf7dSw/9kkcdizPC\ndiJb6a0g38/RzllIyHBCpBGa7afUHa34buq2XAVmml3Yh8hnUJU4cvJ9UMRHdPvs\nOC+1EghQjBb8ShepxGgWV73J9phS5Zb88sveBIb/2ZglNZ/+Oq3hzPEigLbtealR\nrGPOOMCBwyFXZl1BjE9Gg6la\n-----END PRIVATE KEY-----\n"
}

for key, value in vars_to_add.items():
    print(f"Adding {key} to Vercel production...")
    cmd = ["npx.cmd", "-y", "vercel", "env", "add", key, "production", "--value", value, "-y"]
    res = subprocess.run(cmd, capture_output=True, text=True)
    if res.returncode == 0:
        print(f"✔ Successfully added {key}")
    else:
        print(f"✘ Failed {key}: {res.stderr.strip() or res.stdout.strip()}")

print("Done setting environment variables!")
