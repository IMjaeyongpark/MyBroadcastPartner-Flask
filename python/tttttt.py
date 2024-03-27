import asyncio

async def main():
    for i in range(10):
        yield i

async def get_result():
    async for i in main():
        print(i)

asyncio.run(get_result())