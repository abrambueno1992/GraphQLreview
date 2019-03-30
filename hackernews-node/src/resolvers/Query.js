const feed = (root, args, context, info) => {
    return context.prisma.links()
}

    module.export ={
    feed,
}